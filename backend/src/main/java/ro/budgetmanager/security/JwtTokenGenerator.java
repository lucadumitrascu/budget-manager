package ro.budgetmanager.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.JwtException;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtTokenGenerator {

    private final SecurityConstants securityConstants;

    public JwtTokenGenerator(SecurityConstants securityConstants) {
        this.securityConstants = securityConstants;
    }

    public String generateToken(String email, boolean isResetPassword) {
        Date now = new Date();
        long expiration = isResetPassword ? 10 * 60 * 1000L : securityConstants.getJwtExpiration();
        Date tokenExpirationDate = new Date(now.getTime() + expiration);

        JwtBuilder builder = Jwts.builder()
                .setSubject(email)
                .setIssuedAt(now)
                .setExpiration(tokenExpirationDate)
                .signWith(securityConstants.getJwtSecretKey(), securityConstants.getJwtSignatureAlgorithm());

        if (isResetPassword) {
            builder.claim("type", "password_reset");
        }

        return builder.compact();
    }

    public String getEmailFromJwt(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(securityConstants.getJwtSecretKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
        return claims.getSubject();
    }

    public boolean isTokenValid(String token, boolean isResetPassword) {
        try {
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(securityConstants.getJwtSecretKey())
                    .build()
                    .parseClaimsJws(token)
                    .getBody();

            if (isResetPassword) {
                String type = claims.get("type", String.class);
                return "password_reset".equals(type);
            }
            return true;
        } catch (JwtException e) {
            return false;
        }
    }
}
