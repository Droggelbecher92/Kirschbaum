package de.lowani.backend.filter;

import de.lowani.backend.api.User;
import de.lowani.backend.config.JwtConfig;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.*;

import java.time.Duration;
import java.time.Instant;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(
        properties = "spring.profiles.active:h2",
        webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT
)
class JwtAuthFilterTest {

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private JwtConfig jwtConfig;

    private String url() {
        return "http://localhost:" + port + "/auth/me";
    }

    @Test
    public void validJwt() {
        // Given
        String username = "Bob";
        Instant now = Instant.now();
        Date iat = Date.from(now);
        Date exp = Date.from(now.plus(Duration.ofMinutes(jwtConfig.getExpiresAfterHours())));
        String token = Jwts.builder()
                .setClaims(new HashMap<>(
                        Map.of("role", "user")
                ))
                .setIssuedAt(iat)
                .setExpiration(exp)
                .setSubject(username)
                .signWith(SignatureAlgorithm.HS256, jwtConfig.getSecret()).compact();


        // When
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(token);
        headers.setContentType(MediaType.APPLICATION_JSON);
        ResponseEntity<User> response = restTemplate
                .exchange(url(), HttpMethod.GET, new HttpEntity<>(headers), User.class);

        // Then
        assertThat(response.getStatusCode(), is(HttpStatus.OK));
        assertNotNull(response.getBody());
        assertThat(response.getBody().getName(), is(username));
    }

    @Test
    public void wronglySigned() {
        // Given
        String username = "Bob";
        Instant now = Instant.now();
        Date iat = Date.from(now);
        Date exp = Date.from(now.plus(Duration.ofMinutes(jwtConfig.getExpiresAfterHours())));
        String wrongSecret = jwtConfig.getSecret() + "Wrong!!";
        String token = Jwts.builder()
                .setClaims(new HashMap<>(
                        Map.of("role", "user")
                ))
                .setIssuedAt(iat)
                .setExpiration(exp)
                .setSubject(username)
                .signWith(SignatureAlgorithm.HS256, wrongSecret).compact();

        // When
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(token);
        ResponseEntity<User> response = restTemplate
                .exchange(url(), HttpMethod.GET, new HttpEntity<>(headers), User.class);

        // Then
        assertThat(response.getStatusCode(), is(HttpStatus.FORBIDDEN));
    }

    @Test
    public void expiredToken() {
        // Given
        String username = "Bob";
        Instant now = Instant.now().minus(Duration.ofMinutes(jwtConfig.getExpiresAfterHours() * 2L));
        Date iat = Date.from(now);
        Date exp = Date.from(now.plus(Duration.ofMinutes(jwtConfig.getExpiresAfterHours())));
        String token = Jwts.builder()
                .setClaims(new HashMap<>(
                        Map.of("role", "user")
                ))
                .setIssuedAt(iat)
                .setExpiration(exp)
                .setSubject(username)
                .signWith(SignatureAlgorithm.HS256, jwtConfig.getSecret()).compact();

        // When
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(token);
        ResponseEntity<User> response = restTemplate
                .exchange(url(), HttpMethod.GET, new HttpEntity<>(headers), User.class);

        // Then
        assertThat(response.getStatusCode(), is(HttpStatus.FORBIDDEN));
    }
}