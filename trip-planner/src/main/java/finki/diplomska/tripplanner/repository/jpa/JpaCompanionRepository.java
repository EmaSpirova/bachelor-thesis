package finki.diplomska.tripplanner.repository.jpa;

import finki.diplomska.tripplanner.models.Companion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JpaCompanionRepository extends JpaRepository<Companion, Long> {
}
