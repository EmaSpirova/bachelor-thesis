package finki.diplomska.tripplanner.service;

import finki.diplomska.tripplanner.models.User;
import finki.diplomska.tripplanner.models.dto.UserDto;

import java.util.List;
import java.util.Optional;


public interface UserService {

    User saveUser (User user);
    List<String> getAllUsernames();
    Optional<String> getPassword(UserDto userDto);
    Optional<User> findById(Long id);
}
