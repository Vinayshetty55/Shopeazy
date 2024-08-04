package com.ShopEazy.ShopeazyBackend.services.admin.category;

import com.ShopEazy.ShopeazyBackend.dto.CategoryDto;
import com.ShopEazy.ShopeazyBackend.entity.Category;
import com.ShopEazy.ShopeazyBackend.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService{

    private final CategoryRepository categoryRepository;


    public Category createCategory(CategoryDto categoryDto){
        Category category = new Category();
        category.setName(categoryDto.getName());
        category.setDescription(categoryDto.getDescription());
        return categoryRepository.save(category);
    }
}
