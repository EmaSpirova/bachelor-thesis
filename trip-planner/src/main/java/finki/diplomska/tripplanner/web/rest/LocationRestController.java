package finki.diplomska.tripplanner.web.rest;

import finki.diplomska.tripplanner.models.Location;
import finki.diplomska.tripplanner.service.LocationService;
import finki.diplomska.tripplanner.service.PlannerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(value = "/api")
public class LocationRestController {

    private final LocationService locationService;
    private final PlannerService plannerService;

    public LocationRestController(LocationService locationService, PlannerService plannerService) {
        this.locationService = locationService;
        this.plannerService = plannerService;
    }

    @GetMapping(value = "/locations")
    public List<Location> findAllLocations(){
        return this.locationService.findAll();
    }

    @GetMapping(value = "/location/{id}")
    public ResponseEntity<Location> findLocationById(@PathVariable Long id){
            return this.locationService.findById(id)
                    .map(location -> ResponseEntity.ok().body(location))
                    .orElseGet(()-> ResponseEntity.notFound().build());
    }

    @GetMapping(value = "/trip/locations")
    public List<Location> allLocationsAfterSubmittedForm(@RequestParam(required = false) Long locationId,
                                                         @RequestParam(required = false)  Long companionId,
                                                         @RequestParam(required = false) Long lengthOfStay,
                                                         @RequestParam(required = false) String categoryIds)  {
        return this.locationService.findLocations(locationId, companionId, lengthOfStay, categoryIds);
        /* List<Location> generatedLocations = this.locationService.scheduleLocations(locName, companion, region, categories, numberOfDays);
        if(locName.equals("Macedonia")){
            return generatedLocations;
        }else{
            return generatedLocations;
        }*/
    }
}
