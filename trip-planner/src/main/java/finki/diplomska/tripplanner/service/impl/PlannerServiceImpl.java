package finki.diplomska.tripplanner.service.impl;

import finki.diplomska.tripplanner.models.Location;
import finki.diplomska.tripplanner.models.Planner;
import finki.diplomska.tripplanner.models.User;
import finki.diplomska.tripplanner.models.dto.PlannerDto;
import finki.diplomska.tripplanner.models.exceptions.LocationNotFoundException;
import finki.diplomska.tripplanner.models.exceptions.PlannerNotFoundException;
import finki.diplomska.tripplanner.repository.jpa.JpaLocationRepository;
import finki.diplomska.tripplanner.repository.jpa.JpaPlannerRepository;
import finki.diplomska.tripplanner.repository.jpa.JpaUserRepository;
import finki.diplomska.tripplanner.service.PlannerService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PlannerServiceImpl implements PlannerService {

    private final JpaPlannerRepository plannerRepository;
    private final JpaLocationRepository locationRepository;
    private final JpaUserRepository userRepository;

    public PlannerServiceImpl(JpaPlannerRepository plannerRepository, JpaLocationRepository locationRepository, JpaUserRepository userRepository) {
        this.plannerRepository = plannerRepository;
        this.locationRepository = locationRepository;
        this.userRepository = userRepository;
    }

    @Override
    public List<Planner> getAllPlaners() {
        return this.plannerRepository.findAll();
    }

    @Override
    public List<Planner> getPlannersByUser(String username) {
        User user = this.userRepository.findByUsername(username);
        return this.plannerRepository.getPlannersByUser(user.getUsername());
    }

    @Override
    public Optional<Planner> findById(Long id) {
        return this.plannerRepository.findById(id);
    }


    @Override
    public Optional<Planner> newPlanner(PlannerDto plannerDto, String username) {
        /*
        List<Location> locationList  = new ArrayList<>();
        for(Long location : plannerDto.getLocationList()){
            Location loc = this.locationRepository.findById(location)
                    .orElseThrow(() -> new LocationNotFoundException(location));
            locationList.add(loc);
        }
         */
        User user = this.userRepository.findByUsername(username);
        plannerDto.setUser(user.getUsername());
        return Optional.of(this.plannerRepository.save(new Planner(plannerDto.getName(), plannerDto.getDescription(), null, user)));
    }

    @Override
    public void deletePlannerById(Long id) {
        this.plannerRepository.deleteById(id);
    }

    @Override
    public void deleteLocationFromPlanner(Long locationId) {
        this.plannerRepository.deleteLocationFromPlanner(locationId);
    }

    @Override
    public Planner createPlannerWithRequestParams(String plandesc,String planname, List<Location> locationList) {
        Planner planner = Planner.createNewPlanner(plandesc, planname, locationList);
        return this.plannerRepository.save(planner);
    }

    @Override
    public Planner editPlannerWithRequestParams(Long id, String description, String name, List<Location> locationList) {
        Planner planner = this.plannerRepository.findById(id).orElseThrow(() -> new LocationNotFoundException(id));
        planner.setDescription(description);
        planner.setName(name);
        planner.setLocationList(locationList);
        return this.plannerRepository.save(planner);
    }

    @Override
    public Optional<Planner> editPlanner(Long id, PlannerDto plannerDto, String username) {
        Planner planner = this.plannerRepository.findById(id).orElseThrow(() -> new PlannerNotFoundException(id));
        User user = this.userRepository.findByUsername(username);

        planner.setName(plannerDto.getName());
        planner.setDescription(plannerDto.getDescription());
        plannerDto.setUser(user.getUsername());
        planner.setUser(user);
/*
        List<Location> locationList  = new ArrayList<>();
        for(Long location : plannerDto.getLocationList()){
            Location loc = this.locationRepository.findById(location)
                    .orElseThrow(() -> new LocationNotFoundException(location));
            locationList.add(loc);
        }
        planner.setLocationList(locationList);

 */
        return Optional.of(this.plannerRepository.save(planner));
    }

}

