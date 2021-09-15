package de.lowani.backend.controller;


import de.lowani.backend.api.Category;
import de.lowani.backend.entities.CategoryEntity;
import de.lowani.backend.entities.UserEntity;
import de.lowani.backend.exception.UnauthorizedUserException;
import de.lowani.backend.service.CategoryService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityExistsException;
import java.util.LinkedList;
import java.util.List;

import static de.lowani.backend.controller.CategoryController.CATEGORY_CONTROLLER_TAG;
import static javax.servlet.http.HttpServletResponse.*;
import static org.springframework.http.ResponseEntity.ok;
import static org.springframework.util.MimeTypeUtils.APPLICATION_JSON_VALUE;

@Tag(name = CATEGORY_CONTROLLER_TAG, description = "Provides CRUD operations for the Categories")
@Api(
        tags = CATEGORY_CONTROLLER_TAG
)
@CrossOrigin
@RestController
@RequestMapping("/category")
public class CategoryController {

    public static final String CATEGORY_CONTROLLER_TAG = "Category";

    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping(produces = APPLICATION_JSON_VALUE)
    @ApiResponses(value = {
            @ApiResponse(code = SC_NO_CONTENT, message = "No categories found")
    })
    public ResponseEntity<List<Category>> getAllCategories(){
        List<CategoryEntity> allEntities = categoryService.findAll();
        if (allEntities.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        List<Category> categories = map(allEntities);
        return ok(categories);
    }

    @PostMapping(value="/new" ,produces = APPLICATION_JSON_VALUE, consumes = APPLICATION_JSON_VALUE )
    @ApiResponses(value = {
            @ApiResponse(code = SC_BAD_REQUEST, message = "Category must not be empty"),
            @ApiResponse(code = SC_UNAUTHORIZED, message = "User can not add new Category"),
            @ApiResponse(code = SC_CONFLICT, message = "Category already present")
    })
    public ResponseEntity<Category> postNewCategory(@AuthenticationPrincipal UserEntity authUser, @RequestBody Category newCategory){
        if (!authUser.getRole().equals("admin")){
            throw new UnauthorizedUserException("Only Admin can add a Category");
        }
        if (newCategory.getCategory().isEmpty()||newCategory.getCategory().length()<1){
            throw new IllegalArgumentException("No valid Category name");
        }
        if (categoryService.findByName(newCategory.getCategory()).isPresent()){
            throw new EntityExistsException("Category already in use");
        }
        CategoryEntity categoryEntity = map(newCategory);
        CategoryEntity addedCategoryEnt = categoryService.save(categoryEntity);
        Category addedCategory = map(addedCategoryEnt);
        return ok(addedCategory);
    }

    //Mapper

    private Category map(CategoryEntity categoryEntity) {
        return Category.builder().category(categoryEntity.getName()).build();
    }

    private CategoryEntity map(Category category) {
        return CategoryEntity.builder().name(category.getCategory()).build();
    }

    private List<Category> map(List<CategoryEntity> categoryEntities) {
        List<Category> categories = new LinkedList<>();
        for (CategoryEntity categoryEntity : categoryEntities) {
            Category category = map(categoryEntity);
            categories.add(category);
        }
        return categories;
    }
}
