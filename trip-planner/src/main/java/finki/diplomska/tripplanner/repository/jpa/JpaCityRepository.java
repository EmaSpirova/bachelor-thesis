package finki.diplomska.tripplanner.repository.jpa;

import finki.diplomska.tripplanner.models.City;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface JpaCityRepository extends JpaRepository<City, Long> {
}
