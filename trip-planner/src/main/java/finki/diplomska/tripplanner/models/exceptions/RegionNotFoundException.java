package finki.diplomska.tripplanner.models.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class RegionNotFoundException extends RuntimeException{
    public RegionNotFoundException(Long id){super(String.format("Region with id %d is not found", id));}
}
