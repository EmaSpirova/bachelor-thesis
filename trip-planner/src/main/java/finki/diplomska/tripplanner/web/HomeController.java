package finki.diplomska.tripplanner.web;

import finki.diplomska.tripplanner.models.*;
import finki.diplomska.tripplanner.service.*;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping(value = "/old")
public class HomeController {

    private final CityService cityService;
    private final CountryService countryService;
    private final CategoryService categoryService;
    private final CompanionService companionService;
    private final LocationService locationService;
    private final RegionService regionService;
    private final PlannerService plannerService;

    public HomeController(CityService cityService, CountryService countryService,
                          CategoryService categoryService, CompanionService companionService,
                          LocationService locationService, RegionService regionService, PlannerService plannerService) {
        this.cityService = cityService;
        this.countryService = countryService;
        this.categoryService = categoryService;
        this.companionService = companionService;
        this.locationService = locationService;
        this.regionService = regionService;
        this.plannerService = plannerService;
    }

    @GetMapping
    public String homepage(Model model){
        List<City> cities = this.cityService.findAll();
        List<Country> countries = this.countryService.findAll();
        List<Category> categories = this.categoryService.findAll();
        List<Companion> companions = this.companionService.findAll();
        List<Region> regions = this.regionService.findAll();
        model.addAttribute("cities", cities);
        model.addAttribute("countries", countries);
        model.addAttribute("categories",categories);
        model.addAttribute("companions",companions);
        model.addAttribute("regions",regions);
        return "homepage";
    }

    @PostMapping(value = "/trip/locations")
    public String allLocations(Model model, @RequestParam(required = false) String ime,
                               @RequestParam(required = false)  String pridruzba,
                               @RequestParam(required = false) String region,
                               @RequestParam(required = false) List<String> categories,
                               @RequestParam(required = false)  int numberOfDays)  {
        List<Location> countryLocations = this.locationService.scheduleLocations(ime, pridruzba, region, categories, numberOfDays);
        if(ime.equals("Macedonia")){
            model.addAttribute("countryLocations", countryLocations);
            return "trip-locations-country";
        }else
        model.addAttribute("imgUtil", new ImageUtil());
        model.addAttribute("countryLocations", countryLocations);
        return "trip-locations";
    }

    @GetMapping(value = "/trip/locations/{id}")
    public String seeDetailsAboutLocation(@PathVariable Long id, Model model){
        Optional<Location> location = this.locationService.findById(id);
        model.addAttribute("location", location);
        return "location";
    }

}
