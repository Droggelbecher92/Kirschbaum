package de.lowani.backend.entities;

import de.lowani.backend.SpringBootTests;
import de.lowani.backend.repo.UserRepo;
import org.junit.jupiter.api.Test;
import org.springframework.dao.DataIntegrityViolationException;

import javax.annotation.Resource;
import javax.transaction.Transactional;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;

class UserEntityTest extends SpringBootTests {
    @Resource
    private UserRepo userRepository;

    @Test
    @Transactional
    public void testCreateUserWithoutNameShouldThrow() {
        try {
            UserEntity userEntity = new UserEntity();
            userRepository.save(userEntity);
            fail("user without name must not be persisted");

        } catch (DataIntegrityViolationException ignore) {
            // expected
        }
    }

    @Test
    @Transactional
    public void testCreateUserName() {
        UserEntity userEntity = new UserEntity();
        userEntity.setName("foo");
        userEntity.setPassword("password");
        userEntity.setRole("user");
        userEntity.setScore(0L);
        assertNull(userEntity.getId());

        UserEntity createdEntity = userRepository.save(userEntity);
        assertNotNull(createdEntity.getId());
        assertEquals(createdEntity, userEntity);

        // additional equals hash code test by adding same instance to set twice
        Set<UserEntity> users = new HashSet<>();
        users.add(userEntity);
        users.add(createdEntity);
        assertEquals(1, users.size());
    }

    @Test
    @Transactional
    public void testUserContainsName() {
        // GIVEN
        UserEntity userEntity = new UserEntity();
        userEntity.setName("foo");
        userEntity.setPassword("password");
        userEntity.setRole("user");
        userEntity.setScore(0L);
        UserEntity expectedUser = userRepository.save(userEntity);

        // WHEN
        Optional<UserEntity> actualUserOpt = userRepository.findByNameContains("o");
        assertTrue(actualUserOpt.isPresent());

        // THEN
        assertEquals(expectedUser, actualUserOpt.get());
    }

}