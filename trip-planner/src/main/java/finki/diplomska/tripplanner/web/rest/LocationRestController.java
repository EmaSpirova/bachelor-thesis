package finki.diplomska.tripplanner.web.rest;

import finki.diplomska.tripplanner.models.Location;
import finki.diplomska.tripplanner.models.dto.PlannerLocationDto;
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

    @GetMapping(value = "/city/locations")
    public List<Location> getAllLocationsFromCity(@RequestParam(required = false) Long cityId,
                                                         @RequestParam(required = false)  Long companionId,
                                                         @RequestParam(required = false) Long lengthOfStay,
                                                         @RequestParam(required = false) String categoryIds)  {
        return this.locationService.findLocationsFromCityForm(cityId, companionId, lengthOfStay, categoryIds);

    }

    @GetMapping(value = "/region/locations")
    public List<Location> getAllLocationsFromRegion(@RequestParam(required = false) Long regionId,
                                                    @RequestParam(required = false)  Long companionId,
                                                    @RequestParam(required = false) Long lengthOfStay,
                                                    @RequestParam(required = false) String categoryIds){
        return this.locationService.findLocationsFromRegionForm(regionId, companionId,lengthOfStay, categoryIds);
    }

    @PutMapping(value = "/add-location")
    public Location addLocationToPlanner(@RequestBody PlannerLocationDto plannerLocationDto){
        return this.locationService.addLocationToPlanner(plannerLocationDto);
    }

    @GetMapping(value = "/planner/locations")
    public List<Location> getAllLocationsForPlanner (@RequestParam Long plannerId){
        return this.locationService.getAllLocationsForPlanner(plannerId);
    }

    @GetMapping(value = "weekend")
    public List<Location> getWeekendGetaways(){
        return this.locationService.getWeekendGetaways();
    }

    @GetMapping(value = "villages")
    public List<Location> getVillages(){
        return this.locationService.getVillages();
    }

    @GetMapping(value = "/planner/locationIds")
    public List<Long> getAllLocationIdsForPlanner(@RequestParam Long plannerId){
        return this.locationService.getAllLocationIdsForPlanner(plannerId);
    }

}
