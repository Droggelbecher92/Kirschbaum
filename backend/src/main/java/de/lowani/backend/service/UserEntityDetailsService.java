package de.lowani.backend.service;

import de.lowani.backend.entities.UserEntity;
import de.lowani.backend.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserEntityDetailsService implements UserDetailsService {

    private final UserRepo userRepo;

    @Autowired
    public UserEntityDetailsService(UserRepo userRepo) {
        this.userRepo = userRepo;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserEntity user = userRepo
                .findByName(username)
                .orElseThrow(() -> new UsernameNotFoundException("not found: "+username));

        return User.builder()
                .username(user.getName())
                .password(user.getPassword())
                .authorities("user")
                .build();
    }

}
