package finki.diplomska.tripplanner.web.rest;

import finki.diplomska.tripplanner.models.Category;
import finki.diplomska.tripplanner.service.CategoryService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(value = "/api")
public class CategoriesRestController {

    private final CategoryService categoryService;

    public CategoriesRestController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping(value = "/categories")
    public List<Category> findAllCategories(){
        return this.categoryService.findAll();
    }
}
