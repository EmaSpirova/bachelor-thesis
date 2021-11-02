package finki.diplomska.tripplanner.service.impl;

import finki.diplomska.tripplanner.models.Location;
import finki.diplomska.tripplanner.models.Planner;
import finki.diplomska.tripplanner.models.dto.PlannerDto;
import finki.diplomska.tripplanner.models.exceptions.LocationNotFoundException;
import finki.diplomska.tripplanner.models.exceptions.PlannerNotFoundException;
import finki.diplomska.tripplanner.repository.jpa.JpaLocationRepository;
import finki.diplomska.tripplanner.repository.jpa.JpaPlannerRepository;
import finki.diplomska.tripplanner.service.LocationService;
import finki.diplomska.tripplanner.service.PlannerService;
import org.springframework.stereotype.Service;
import reactor.util.annotation.Nullable;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PlannerServiceImpl implements PlannerService {

    private final JpaPlannerRepository plannerRepository;
    private final JpaLocationRepository locationRepository;
    private final LocationService locationService;

    public PlannerServiceImpl(JpaPlannerRepository plannerRepository, JpaLocationRepository locationRepository, LocationService locationService) {
        this.plannerRepository = plannerRepository;
        this.locationRepository = locationRepository;
        this.locationService = locationService;
    }

    @Override
    public List<Planner> getAllPlaners() {
        return this.plannerRepository.findAll();
    }

    @Override
    public Optional<Planner> findById(Long id) {
        return this.plannerRepository.findById(id);
    }

    @Override
    public Planner addLocationToPlanner(Long plannerId, Long locationId) {
        Location location = this.locationService.findById(locationId)
                .orElseThrow(() -> new LocationNotFoundException(locationId));
        Planner planner = this.plannerRepository.getById(plannerId);
        planner.getLocationList().add(location);
        return this.plannerRepository.save(planner);
    }

    @Override
    public Optional<Planner> newPlanner(PlannerDto plannerDto) {
        /*
        List<Location> locationList  = new ArrayList<>();
        for(Long location : plannerDto.getLocationList()){
            Location loc = this.locationRepository.findById(location)
                    .orElseThrow(() -> new LocationNotFoundException(location));
            locationList.add(loc);
        }

         */
           return Optional.of(this.plannerRepository.save(new Planner(plannerDto.getName(), plannerDto.getDescription(), null)));
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
    public Optional<Planner> editPlanner(Long id, PlannerDto plannerDto) {
        Planner planner = this.plannerRepository.findById(id).orElseThrow(() -> new PlannerNotFoundException(id));

        planner.setName(plannerDto.getName());
        planner.setDescription(plannerDto.getDescription());

        List<Location> locationList  = new ArrayList<>();
        for(Long location : plannerDto.getLocationList()){
            Location loc = this.locationRepository.findById(location)
                    .orElseThrow(() -> new LocationNotFoundException(location));
            locationList.add(loc);
        }
        planner.setLocationList(locationList);
        return Optional.of(this.plannerRepository.save(planner));
    }

}

