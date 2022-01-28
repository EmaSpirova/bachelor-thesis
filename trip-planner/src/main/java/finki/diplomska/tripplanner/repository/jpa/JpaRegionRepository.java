package finki.diplomska.tripplanner.repository.jpa;

import finki.diplomska.tripplanner.models.Region;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JpaRegionRepository extends JpaRepository<Region, Long> {

    @Query(value="SELECT r.region_name " +
            "FROM regions AS r " +
            "UNION all " +
            "SELECT c.city_name FROM cities AS c", nativeQuery = true)
    List<String> getAllCitiesAndRegions();
}