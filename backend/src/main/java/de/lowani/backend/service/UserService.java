package de.lowani.backend.service;

import de.lowani.backend.entities.UserEntity;
import de.lowani.backend.repo.UserRepo;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.persistence.EntityExistsException;
import java.util.List;
import java.util.Optional;

import static org.springframework.util.StringUtils.hasText;

@Service
@Getter
@Setter
public class UserService {


    private final UserRepo userRepo;
    private final PasswordService passwordService;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepo userRepo, PasswordService passwordService, PasswordEncoder passwordEncoder) {
        this.userRepo = userRepo;
        this.passwordService = passwordService;
        this.passwordEncoder = passwordEncoder;
    }

    public List<UserEntity> findAll() { return userRepo.findAll();}

    public Optional<UserEntity> find(String name) {
        return userRepo.findByName(name);
    }

    public UserEntity save(UserEntity user) {
        String name = user.getName();
        if (!hasText(name)) {
            throw new IllegalArgumentException("Name must not be blank to create user");
        }
        checkUserNameExists(name);
        String createdPassword = passwordService.getNewPassword();
        String hashedPassword = passwordEncoder.encode(createdPassword);
        UserEntity savedUser = userRepo.save(user.toBuilder().password(hashedPassword).build());
        return savedUser.toBuilder().password(createdPassword).build();
    }

    private void checkUserNameExists(String name) {
        Optional<UserEntity> existingUser = find(name);
        if (existingUser.isPresent()) {
            throw new EntityExistsException(String.format(
                    "User with name=%s already exists", name));
        }
    }
}
