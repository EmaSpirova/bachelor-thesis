package finki.diplomska.tripplanner.web;

import finki.diplomska.tripplanner.models.*;
import finki.diplomska.tripplanner.service.*;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping(value = "/create")
public class CreatePlannerController {

    private final LocationService locationService;
    private final PlannerService plannerService;
    private final CityService cityService;
    private final CountryService countryService;
    private final CategoryService categoryService;
    private final CompanionService companionService;
    private final RegionService regionService;

    public CreatePlannerController(LocationService locationService, PlannerService plannerService, CityService cityService, CountryService countryService, CategoryService categoryService, CompanionService companionService, RegionService regionService) {
        this.locationService = locationService;
        this.plannerService = plannerService;
        this.cityService = cityService;
        this.countryService = countryService;
        this.categoryService = categoryService;
        this.companionService = companionService;
        this.regionService = regionService;
    }

    @GetMapping
    public String createPlanner(Model model) {
        return "create-planner";
    }

    @PostMapping(value = "/planner")
    public String newPlanner(@RequestParam String plandesc ,
                             @RequestParam String planname,
            @RequestParam(required = false) List<Long> locationList) {
        List<Location> locations = new ArrayList<>();
        if (!(locationList == null)) {
            for (long id : locationList) {
                Location location = locationService.getById(id);
                locations.add(location);
            }
            this.plannerService.createPlannerWithRequestParams(plandesc, planname, locations);
        } else {
            this.plannerService.createPlannerWithRequestParams(plandesc, planname, null);
        }
        return "redirect:/create/planner";
    }


    @GetMapping(value = "/planner")
    public String showPlanners(Model model) {
        List<Planner> plannerList = plannerService.getAllPlaners();
        model.addAttribute("plannerList",plannerList);
        return "create-homepage";
    }

    @GetMapping(value = "/planner/{id}")
    public String editShow(@PathVariable Long id, Model model) {
        Optional<Planner> detailsAboutPlanner = this.plannerService.findById(id);
        model.addAttribute("detailsAboutPlanner", detailsAboutPlanner);
        return "edit-planner";
    }

    @PostMapping(value = "/planner/{id}")
    public String editsave(@PathVariable Long id,
                           @RequestParam(required = false) String plandesc,
                           @RequestParam(required = false) String planname) {

            this.plannerService.editPlannerWithRequestParams(id, plandesc, planname, null);

        return "redirect:/create/planner";
    }

    @GetMapping(value = "/locations")
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
    public String allLocations(Model model, @RequestParam(required = false) String locName,
                               @RequestParam(required = false)  String companion,
                               @RequestParam(required = false) String region,
                               @RequestParam(required = false) List<String> categories,
                               @RequestParam(required = false)  int numberOfDays)  {
        List<Location> countryLocations = this.locationService.scheduleLocations(locName, companion, region, categories, numberOfDays);
        List<Planner> getAllPlanners = this.plannerService.getAllPlaners();

        if(locName.equals("Macedonia")){
            model.addAttribute("countryLocations", countryLocations);
            return "trip-locations-country";
        }else{
            model.addAttribute("imgUtil", new ImageUtil());
            model.addAttribute("getAllPlanners",getAllPlanners);
            model.addAttribute("countryLocations", countryLocations);
            return "trip-locations";
        }
    }

    @GetMapping(value = "/trip/locations/{id}")
    public String seeDetailsAboutLocation(@PathVariable Long id, Model model){
        Optional<Location> location = this.locationService.findById(id);
        model.addAttribute("location", location);
        return "location";
    }

}
