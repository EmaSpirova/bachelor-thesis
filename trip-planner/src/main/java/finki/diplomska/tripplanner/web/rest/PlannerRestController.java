package finki.diplomska.tripplanner.web.rest;

import finki.diplomska.tripplanner.models.Location;
import finki.diplomska.tripplanner.models.Planner;
import finki.diplomska.tripplanner.models.dto.PlannerDto;
import finki.diplomska.tripplanner.service.LocationService;
import finki.diplomska.tripplanner.service.PlannerService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;


@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(value = "/api")
public class PlannerRestController {
    private final PlannerService plannerService;
    private final LocationService locationService;

    public PlannerRestController(PlannerService plannerService, LocationService locationService) {
        this.plannerService = plannerService;
        this.locationService = locationService;
    }

    @GetMapping(value = "/planners")
    public List<Planner> getAllPlanners(){
        return this.plannerService.getAllPlaners();
    }

    @GetMapping(value = "/planner/{id}")
    public ResponseEntity<Planner> findPlannerById(@PathVariable Long id){
        return this.plannerService.findById(id)
                .map(planner -> ResponseEntity.ok().body(planner))
                .orElseGet(()-> ResponseEntity.notFound().build());
    }

    @PostMapping(value = "/planner")
    @ResponseStatus(HttpStatus.CREATED)
    public Planner newPlanner(@RequestParam String description,
                              @RequestParam String name,
                              @RequestParam List<Long> locationList)  {
        List<Location> locations = new ArrayList<>();
        for(long id: locationList){
            Location location = locationService.getById(id);
            locations.add(location);
        }
        Planner planner = plannerService.createPlannerWithRequestParams(description, name, locations);
        return planner;
    }


    @PostMapping(value = "/planner/new", consumes= MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Planner> newPlanner(@RequestBody PlannerDto plannerDto)  {
        return this.plannerService.newPlanner(plannerDto)
                .map(planner -> ResponseEntity.ok().body(planner))
                .orElseGet(() -> ResponseEntity.badRequest().build());
    }


    @PutMapping(value ="edit/planner/{id}", consumes= MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Planner> editPlanner(@PathVariable Long id, @RequestBody PlannerDto plannerDto){
        return this.plannerService.editPlanner(id, plannerDto)
                .map(planner -> ResponseEntity.ok().body(planner))
                .orElseGet(()-> ResponseEntity.badRequest().build());
    }


}
