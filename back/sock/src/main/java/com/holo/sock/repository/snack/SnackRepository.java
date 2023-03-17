package com.holo.sock.repository.snack;

import com.holo.sock.entity.snack.Snack;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SnackRepository extends JpaRepository<Snack, Long> {

    @Query("select s from Snack s join fetch s.type t where s.id = :snackId")
    Optional<Snack> findSnackByIdWithTypeAndFlavor(@Param("snackId") Long snackId);

    List<Snack> findByIdIn(List<Long> id);
}
