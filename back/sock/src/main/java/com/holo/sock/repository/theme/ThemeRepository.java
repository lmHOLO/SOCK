package com.holo.sock.repository.theme;

import com.holo.sock.entity.theme.Theme;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ThemeRepository extends JpaRepository<Theme, Long> {

    @Query(value = "select t from Theme t join fetch t.snack where t.name = :theme",
            countQuery = "select count(t) from Theme t where t.name = :theme")
    Page<Theme> findByTheme(@Param("theme") String theme, Pageable pageable);
}
