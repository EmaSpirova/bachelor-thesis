package finki.diplomska.tripplanner.repository.jpa;

import finki.diplomska.tripplanner.models.Region;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JpaRegionRepository extends JpaRepository<Region, Long> {
}