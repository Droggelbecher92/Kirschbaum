package de.lowani.backend.service;

import de.lowani.backend.entitys.UserEntity;
import de.lowani.backend.repo.UserRepo;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Getter
@Setter
public class UserService {


    private final UserRepo userRepo;

    public UserService(UserRepo userRepo) {
        this.userRepo = userRepo;
    }

    public List<UserEntity> findAll() { return userRepo.findAll();}
}
