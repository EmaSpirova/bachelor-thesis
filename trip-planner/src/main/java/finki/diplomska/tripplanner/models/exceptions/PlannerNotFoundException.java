package finki.diplomska.tripplanner.models.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class PlannerNotFoundException extends RuntimeException{
    public PlannerNotFoundException(Long id) {
        super(String.format("Planner with id: %d was not found", id));
    }
}
