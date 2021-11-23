package finki.diplomska.tripplanner.repository.jpa;

import finki.diplomska.tripplanner.models.Images;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JpaImageRepository extends JpaRepository<Images, Long> {

    @Query(value = "SELECT * FROM images AS i WHERE i.id_location = :locationId", nativeQuery = true)
    List<Images> getAllImagesForLocation(@Param("locationId") Long locationId);
}
