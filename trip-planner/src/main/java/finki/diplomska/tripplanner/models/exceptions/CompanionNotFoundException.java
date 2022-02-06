package finki.diplomska.tripplanner.models.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class CompanionNotFoundException extends RuntimeException{
    public CompanionNotFoundException(Long id) {super(String.format("Companion with id %d is not found", id));}

}
