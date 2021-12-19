package finki.diplomska.tripplanner.repository.jpa;


import finki.diplomska.tripplanner.models.Planner;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JpaPlannerRepository extends JpaRepository<Planner, Long> {

        @Query(value = "SELECT * FROM planners AS p left JOIN users AS u ON p.user_id = u.id WHERE u.username like :username", nativeQuery = true)
        List<Planner> getPlannersByUser(@Param("username") String username );
}
