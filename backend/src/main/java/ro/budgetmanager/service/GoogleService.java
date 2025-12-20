package ro.budgetmanager.service;

import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeTokenRequest;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.googleapis.auth.oauth2.GoogleTokenResponse;

import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Collections;

@Service
public class GoogleService {

    private static final NetHttpTransport HTTP_TRANSPORT = new NetHttpTransport();
    private static final GsonFactory JSON_FACTORY = new GsonFactory();

    private final String clientId;
    private final String clientSecret;

    public GoogleService(@Value("${google.client-id}") String clientId,
                         @Value("${google.client-secret}") String clientSecret) {
        this.clientId = clientId;
        this.clientSecret = clientSecret;
    }

    private String getIdToken(String authCode) {
        try {
            GoogleTokenResponse response = new GoogleAuthorizationCodeTokenRequest(
                    HTTP_TRANSPORT,
                    JSON_FACTORY,
                    clientId,
                    clientSecret,
                    authCode,
                    "postmessage"
            ).execute();
            return response.getIdToken();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    private GoogleIdToken.Payload verifyIdToken(String idTokenString) {
        try {
            GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(HTTP_TRANSPORT, JSON_FACTORY)
                    .setAudience(Collections.singletonList(clientId))
                    .build();

            GoogleIdToken idToken = verifier.verify(idTokenString);

            if (idToken == null) {
                throw new RuntimeException("Invalid ID token.");
            }

            return idToken.getPayload();
        } catch (Exception e) {
            throw new RuntimeException("Failed to verify ID token.");
        }
    }

    protected GoogleIdToken.Payload getPayloadFromAuthCode(String authCode) {
        String idToken = getIdToken(authCode);
        return verifyIdToken(idToken);
    }
}
