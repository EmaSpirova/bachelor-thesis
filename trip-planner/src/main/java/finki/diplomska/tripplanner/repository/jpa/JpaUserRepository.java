package finki.diplomska.tripplanner.repository.jpa;

import finki.diplomska.tripplanner.models.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JpaUserRepository extends CrudRepository<User, Long> {
}
