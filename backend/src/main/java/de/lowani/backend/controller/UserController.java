package de.lowani.backend.controller;


import de.lowani.backend.api.NewPassword;
import de.lowani.backend.api.NewUsername;
import de.lowani.backend.api.User;
import de.lowani.backend.entities.UserEntity;
import de.lowani.backend.exception.UnauthorizedUserException;
import de.lowani.backend.service.MapperService;
import de.lowani.backend.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Optional;

import static de.lowani.backend.controller.UserController.USER_CONTROLLER_TAG;
import static javax.servlet.http.HttpServletResponse.*;
import static org.springframework.http.ResponseEntity.ok;
import static org.springframework.util.MimeTypeUtils.APPLICATION_JSON_VALUE;

@Tag(name = USER_CONTROLLER_TAG, description = "Provides CRUD operations for an User")
@Api(
        tags = USER_CONTROLLER_TAG
)
@CrossOrigin
@RestController
@RequestMapping("/api/user")
public class UserController {

    public static final String USER_CONTROLLER_TAG = "User";

    private final UserService userService;
    private final MapperService mapperService;

    @Autowired
    public UserController(UserService userService, MapperService mapperService) {
        this.userService = userService;
        this.mapperService = mapperService;
    }

    @GetMapping(produces = APPLICATION_JSON_VALUE)
    @ApiResponses(value = {
            @ApiResponse(code = SC_NO_CONTENT, message = "No users found"),
            @ApiResponse(code = SC_UNAUTHORIZED, message = "Users can not search for users")
    })
    public ResponseEntity<List<User>> getAllUsers(@AuthenticationPrincipal UserEntity authUser) {
        if (!authUser.getRole().equals("admin")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        List<UserEntity> allEntities = userService.findAll();
        if (allEntities.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        List<User> users = mapperService.mapListOfUser(allEntities);
        return ok(users);
    }

    @PostMapping(produces = APPLICATION_JSON_VALUE, consumes = APPLICATION_JSON_VALUE)
    @ApiResponses(value = {
            @ApiResponse(code = SC_BAD_REQUEST, message = "Unable to create User with blank name"),
            @ApiResponse(code = SC_CONFLICT, message = "Unable to create User, user already exists"),
            @ApiResponse(code = SC_UNAUTHORIZED, message = "User can not create a user")
    })
    public ResponseEntity<User> postNewUser(@AuthenticationPrincipal UserEntity authUser, @RequestBody User user) {
        if (!authUser.getRole().equals("admin")) {
            throw new UnauthorizedUserException("Only an Admin can create new user");
        }
        UserEntity newUser = mapperService.mapNew(user);
        UserEntity savedUser = userService.save(newUser);

        User createdUser = mapperService.map(savedUser);

        createdUser.setPassword(savedUser.getPassword());
        return ok(createdUser);
    }

    @GetMapping(value = "{name}", produces = APPLICATION_JSON_VALUE)
    @ApiResponses(value = {
            @ApiResponse(code = SC_NOT_FOUND, message = "User not found")
    })

    public ResponseEntity<User> find(@PathVariable String name) {
        Optional<UserEntity> userEntityOptional = userService.find(name);
        if (userEntityOptional.isPresent()) {
            UserEntity userEntity = userEntityOptional.get();
            User user = mapperService.map(userEntity);
            return ok(user);
        } else {
            throw new EntityNotFoundException("No matching user found");
        }
    }

    @PutMapping(value = "/password", produces = APPLICATION_JSON_VALUE, consumes = APPLICATION_JSON_VALUE)
    @ApiResponses(value = {
            @ApiResponse(code = SC_BAD_REQUEST, message = "Password must not be empty"),
            @ApiResponse(code = SC_NOT_FOUND, message = "User not found")
    })
    public ResponseEntity<User> changePassword(@AuthenticationPrincipal UserEntity authUser, @RequestBody NewPassword newPassword) {
        String password = newPassword.getPassword();
        if (password.length() < 1) {
            throw new IllegalArgumentException("Password must not be empty");
        }
        UserEntity changedUserEntity = userService.updatePassword(authUser.getName(), password);

        User changedUser = mapperService.map(changedUserEntity);
        changedUser.setPassword(password);
        return ok(changedUser);
    }

    @PutMapping(value = "/{username}/password", produces = APPLICATION_JSON_VALUE)
    @ApiResponses(value = {
            @ApiResponse(code = SC_NOT_FOUND, message = "User not found"),
            @ApiResponse(code = SC_UNAUTHORIZED, message = "Only Admin can reset passwords")
    })
    public ResponseEntity<User> resetUserPassword(@AuthenticationPrincipal UserEntity authUser, @PathVariable String username) {
        if (!authUser.getRole().equals("admin")) {
            throw new UnauthorizedUserException("Only an Admin can reset password");
        }
        UserEntity changedUserEntity = userService.resetPassword(username);

        User changedUser = mapperService.map(changedUserEntity);
        changedUser.setPassword(changedUserEntity.getPassword());
        return ok(changedUser);
    }

    @PutMapping(value = "/username", produces = APPLICATION_JSON_VALUE, consumes = APPLICATION_JSON_VALUE)
    @ApiResponses(value = {
            @ApiResponse(code = SC_BAD_REQUEST, message = "Username must not be empty or less then 3 letters"),
            @ApiResponse(code = SC_CONFLICT, message = "Username already exists")
    })
    public ResponseEntity<User> changeUsername(@AuthenticationPrincipal UserEntity authUser, @RequestBody NewUsername newUsername) {
        String username = newUsername.getUsername();
        if (username.length() < 3) {
            throw new IllegalArgumentException("Username must not be empty or less then 3 letters");
        }
        UserEntity changedUserEntity = userService.updateUsername(authUser.getName(), username);

        User changedUser = mapperService.map(changedUserEntity);
        return ok(changedUser);
    }

    @DeleteMapping(value = "/{username}", produces = APPLICATION_JSON_VALUE)
    @ApiResponses(value = {
            @ApiResponse(code = SC_NOT_FOUND, message = "User not found"),
            @ApiResponse(code = SC_UNAUTHORIZED, message = "User can not delete a user"),
            @ApiResponse(code = SC_BAD_REQUEST, message = "Admin cannot be deleted")
    })
    public ResponseEntity<User> deleteUser(@AuthenticationPrincipal UserEntity authUser, @PathVariable String username) {
        if (!authUser.getRole().equals("admin")) {
            throw new UnauthorizedUserException("Admin only operation");
        }
        UserEntity deletedUserEntity = userService.deleteUser(username);
        User deletedUser = mapperService.map(deletedUserEntity);
        return ok(deletedUser);
    }
}
