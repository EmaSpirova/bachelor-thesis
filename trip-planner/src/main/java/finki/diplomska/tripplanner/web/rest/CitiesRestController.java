package finki.diplomska.tripplanner.web.rest;

import finki.diplomska.tripplanner.models.City;
import finki.diplomska.tripplanner.service.CityService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(value = "/api")
public class CitiesRestController {

    private final CityService cityService;

    public CitiesRestController(CityService cityService) {
        this.cityService = cityService;
    }

    @GetMapping(value = "cities")
    public List<City> findAllCities(){
        return this.cityService.findAll();
    }
}
