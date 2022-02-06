package finki.diplomska.tripplanner.models.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class CityNotFoundException extends RuntimeException{
    public CityNotFoundException(Long id) {super(String.format("City with id %d is not found", id));}

}
