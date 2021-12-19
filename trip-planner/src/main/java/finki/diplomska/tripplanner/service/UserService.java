package finki.diplomska.tripplanner.service;

import finki.diplomska.tripplanner.models.User;
import finki.diplomska.tripplanner.models.dto.UserDto;

import java.util.Optional;


public interface UserService {

    User saveUser (User user);

}
