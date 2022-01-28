package finki.diplomska.tripplanner.web.rest;

import finki.diplomska.tripplanner.models.Region;
import finki.diplomska.tripplanner.service.RegionService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(value = "/api")
public class RegionRestController {

    private final RegionService regionService;

    public RegionRestController(RegionService regionService) {
        this.regionService = regionService;
    }

    @GetMapping (value = "/regions")
    public List<Region> findAllRegions(){
        return this.regionService.findAll();
    }

    @GetMapping(value = "/places")
    public List<String> getAllCitiesAndRegions(){
        return this.regionService.getAllCitiesAndRegions();
    }
}
