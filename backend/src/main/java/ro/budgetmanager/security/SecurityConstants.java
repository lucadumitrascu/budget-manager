package ro.budgetmanager.security;

import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;

@Component
public class SecurityConstants {

    private final SecretKey jwtSecretKey;
    private final long jwtExpiration;
    private final SignatureAlgorithm jwtSignatureAlgorithm = SignatureAlgorithm.HS512;

    public SecurityConstants(@Value("${jwt.secret}") String secret,
                             @Value("${jwt.expiration}") long jwtExpiration) {
        this.jwtSecretKey = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
        this.jwtExpiration = jwtExpiration;
    }

    public SecretKey getJwtSecretKey() {
        return jwtSecretKey;
    }

    public long getJwtExpiration() {
        return jwtExpiration;
    }

    public SignatureAlgorithm getJwtSignatureAlgorithm() {
        return jwtSignatureAlgorithm;
    }
}
