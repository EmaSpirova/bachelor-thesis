package finki.diplomska.tripplanner.repository.jpa;

import finki.diplomska.tripplanner.models.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JpaCategoryRepository extends JpaRepository<Category, Long> {
}
