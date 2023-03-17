package com.holo.sock.repository.snack;

import com.holo.sock.entity.snack.Flavor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FlavorRepository extends JpaRepository<Flavor, Long> {

    List<Flavor> findFlavorsByIdIn(List<Long> flavorIds);
}
