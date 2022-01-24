package finki.diplomska.tripplanner.repository.jpa;

import finki.diplomska.tripplanner.models.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface JpaUserRepository extends CrudRepository<User, Long> {
    User findByUsername(String username);
    User getById(Long id);

    @Query(value = "SELECT u.username FROM users AS u", nativeQuery = true)
    List<String> getAllUsernames();

    @Query(value = "SELECT u.password FROM users AS u WHERE u.username LIKE :username ", nativeQuery = true)
    Optional<String> getPassword(@Param("username") String username);

}
