package finki.diplomska.tripplanner.service.impl;

import finki.diplomska.tripplanner.models.Category;
import finki.diplomska.tripplanner.repository.jpa.JpaCategoryRepository;
import finki.diplomska.tripplanner.service.CategoryService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {

    private final JpaCategoryRepository categoryRepository;

    public CategoryServiceImpl(JpaCategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public List<Category> findAll() {
        return this.categoryRepository.findAll();
    }
}
