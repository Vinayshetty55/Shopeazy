package com.ShopEazy.ShopeazyBackend.services.admin.category;

import com.ShopEazy.ShopeazyBackend.dto.CategoryDto;
import com.ShopEazy.ShopeazyBackend.entity.Category;

public interface CategoryService {
    Category createCategory(CategoryDto  categoryDto);
}