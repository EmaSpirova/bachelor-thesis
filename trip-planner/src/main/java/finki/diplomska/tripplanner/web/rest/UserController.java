package finki.diplomska.tripplanner.web.rest;

import finki.diplomska.tripplanner.models.User;
import finki.diplomska.tripplanner.models.dto.UserDto;
import finki.diplomska.tripplanner.payload.JWTLoginSucessReponse;
import finki.diplomska.tripplanner.payload.LoginRequest;
import finki.diplomska.tripplanner.security.JwtTokenProvider;
import finki.diplomska.tripplanner.security.SecurityConstants;
import finki.diplomska.tripplanner.service.UserService;
import finki.diplomska.tripplanner.service.impl.MapValidationErrorService;
import finki.diplomska.tripplanner.validator.UserValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(value = "/api/users")
public class UserController {

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @Autowired
    private UserService userService;

    @Autowired
    private UserValidator userValidator;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping(value = "/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest, BindingResult result){
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap != null) return errorMap;

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()
                )
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = SecurityConstants.TOKEN_PREFIX +  tokenProvider.generateToken(authentication);
        return ResponseEntity.ok(new JWTLoginSucessReponse(true, jwt));
    }

    @PostMapping(value = "/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody User user, BindingResult result){
        // Validate passwords match
        userValidator.validate(user, result);
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap != null)return errorMap;
        User newUser = userService.saveUser(user);
        return  new ResponseEntity<User>(newUser, HttpStatus.CREATED);
    }

    @GetMapping(value = "/usernames")
    public List<String> getAllUsernames (){
        return this.userService.getAllUsernames();
    }

    @GetMapping(value = "/password")
    public Optional<String> getPassword(@RequestBody UserDto userDto){

        return this.userService.getPassword(userDto);
    }

}
