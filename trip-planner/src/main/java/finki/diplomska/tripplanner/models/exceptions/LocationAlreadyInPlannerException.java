package finki.diplomska.tripplanner.models.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.PRECONDITION_FAILED)
public class LocationAlreadyInPlannerException extends RuntimeException{
    public LocationAlreadyInPlannerException(Long id, Long locationId) {
        super(String.format("Location with id: %d already exists in the planner with id %d", locationId, id));
    }
}
