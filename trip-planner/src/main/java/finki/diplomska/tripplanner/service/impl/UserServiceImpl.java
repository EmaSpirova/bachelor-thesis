package finki.diplomska.tripplanner.service.impl;

import finki.diplomska.tripplanner.models.User;
import finki.diplomska.tripplanner.models.dto.UserDto;
import finki.diplomska.tripplanner.models.exceptions.UsernameAlreadyExistsException;
import finki.diplomska.tripplanner.repository.jpa.JpaUserRepository;
import finki.diplomska.tripplanner.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class UserServiceImpl  implements UserService {

    @Autowired
    private JpaUserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public User saveUser (User newUser){
        try{
            newUser.setPassword(bCryptPasswordEncoder.encode(newUser.getPassword()));
            //Username has to be unique (exception)
            newUser.setUsername(newUser.getUsername());
            // Make sure that password and confirmPassword match
            // We don't persist or show the confirmPassword
            newUser.setConfirmPassword("");
             return this.userRepository.save(newUser);
        }catch(Exception e){
            throw new UsernameAlreadyExistsException("Username '"+newUser.getUsername()+ "' already exists");
        }
    }

    @Override
    public List<String> getAllUsernames() {
        return this.userRepository.getAllUsernames();
    }

    @Override
    public Optional<String> getPassword(UserDto userDto) {
         this.userRepository.getPassword(userDto.getUsername());
         return null;
    }

    @Override
    public Optional<User> findById(Long id) {
        return this.userRepository.findById(id);
    }

}
