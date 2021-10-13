package finki.diplomska.tripplanner.repository.jpa;


import finki.diplomska.tripplanner.models.Planner;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JpaPlannerRepository extends JpaRepository<Planner, Long> {


}
