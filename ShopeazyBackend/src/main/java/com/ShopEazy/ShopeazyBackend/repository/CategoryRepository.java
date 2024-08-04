package com.ShopEazy.ShopeazyBackend.repository;

import com.ShopEazy.ShopeazyBackend.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<Category , Long> {

}
