package de.lowani.backend.repo;

import de.lowani.backend.entities.CategoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CategoryRepo extends JpaRepository<CategoryEntity, Long> {

    Optional<CategoryEntity> findByName(String name);
}
