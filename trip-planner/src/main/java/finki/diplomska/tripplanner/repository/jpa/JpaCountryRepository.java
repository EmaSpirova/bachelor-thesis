package finki.diplomska.tripplanner.repository.jpa;

import finki.diplomska.tripplanner.models.Country;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JpaCountryRepository extends JpaRepository<Country, Long> {
}
