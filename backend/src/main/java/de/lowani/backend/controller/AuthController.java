package de.lowani.backend.controller;

import de.lowani.backend.api.AccessToken;
import de.lowani.backend.api.Credentials;
import de.lowani.backend.api.User;
import de.lowani.backend.entities.UserEntity;
import de.lowani.backend.service.JwtService;
import de.lowani.backend.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import static de.lowani.backend.controller.AuthController.AUTH_TAG;
import static io.jsonwebtoken.lang.Assert.hasText;
import static javax.servlet.http.HttpServletResponse.SC_BAD_REQUEST;
import static javax.servlet.http.HttpServletResponse.SC_UNAUTHORIZED;
import static org.springframework.http.HttpStatus.UNAUTHORIZED;
import static org.springframework.http.ResponseEntity.ok;
import static org.springframework.util.MimeTypeUtils.APPLICATION_JSON_VALUE;

@Tag(name = AUTH_TAG, description = "Provides login and principal information")
@Api(
        tags = AUTH_TAG
)
@RestController
@CrossOrigin
public class AuthController {

    public static final String AUTH_TAG = "Auth";
    public static final String ACCESS_TOKEN_URL = "/auth/access_token";

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UserService userService;

    @Autowired
    public AuthController(AuthenticationManager authenticationManager, JwtService jwtService, UserService userService) {
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
        this.userService = userService;
    }

    @Operation(summary = "Get logged in authentication principal.")
    @GetMapping(value = "api/auth/me", produces = APPLICATION_JSON_VALUE)
    public ResponseEntity<User> getLoggedInUser(@AuthenticationPrincipal UserEntity user) {
        return ok(
                User.builder().name(user.getName()).build()
        );
    }

    @Operation(summary = "Create JWT token by credentials.")
    @PostMapping(value = ACCESS_TOKEN_URL, produces = APPLICATION_JSON_VALUE, consumes = APPLICATION_JSON_VALUE)
    @ApiResponses(value = {
            @ApiResponse(code = SC_BAD_REQUEST, message = "Username or password blank"),
            @ApiResponse(code = SC_UNAUTHORIZED, message = "Invalid credentials")
    })
    public ResponseEntity<AccessToken> getAccessToken(@RequestBody Credentials credentials) {
        String userName = credentials.getUserName();
        hasText(userName, "Username must not be blank to get token");
        String password = credentials.getPassword();
        hasText(password, "Password must not be blank to get token");

        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(userName, password);

        try {
            authenticationManager.authenticate(authToken);

            UserEntity user = userService.find(userName).orElseThrow();
            String token = jwtService.createJwtToken(user);

            AccessToken accessToken = new AccessToken(token);
            return ok(accessToken);

        } catch (AuthenticationException ex) {
            return new ResponseEntity<>(UNAUTHORIZED);
        }
    }

}
