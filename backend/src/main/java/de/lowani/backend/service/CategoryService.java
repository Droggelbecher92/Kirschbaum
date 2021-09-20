package de.lowani.backend.service;


import de.lowani.backend.entities.CategoryEntity;
import de.lowani.backend.repo.CategoryRepo;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import static org.springframework.http.ResponseEntity.ok;

@Service
@Getter
@Setter
public class CategoryService {

    private final CategoryRepo categoryRepo;

    public CategoryService(CategoryRepo categoryRepo) {
        this.categoryRepo = categoryRepo;
    }


    public List<CategoryEntity> findAll() {
        return categoryRepo.findAll();
    }

    public Optional<CategoryEntity> findByName(String name){return categoryRepo.findByName(name);}

    public CategoryEntity save(CategoryEntity categoryEntity) {
       return categoryRepo.save(categoryEntity);
    }
}
