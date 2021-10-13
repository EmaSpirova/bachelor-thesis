package finki.diplomska.tripplanner.web.rest;

import finki.diplomska.tripplanner.models.Country;
import finki.diplomska.tripplanner.service.CountryService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(value = "api")
public class CountryRestController {

    private final CountryService countryService;

    public CountryRestController(CountryService countryService) {
        this.countryService = countryService;
    }

    @GetMapping(value = "/countries")
    public List<Country> findAllCountries(){
        return this.countryService.findAll();
    }
}
