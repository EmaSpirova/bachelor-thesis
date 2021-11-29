package finki.diplomska.tripplanner.service.impl;

import finki.diplomska.tripplanner.models.User;
import finki.diplomska.tripplanner.models.dto.UserDto;
import finki.diplomska.tripplanner.models.exceptions.UsernameAlreadyExistsException;
import finki.diplomska.tripplanner.repository.jpa.JpaUserRepository;
import finki.diplomska.tripplanner.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;


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

}
