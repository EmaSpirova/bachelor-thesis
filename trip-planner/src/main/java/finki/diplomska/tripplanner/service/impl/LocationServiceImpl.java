package finki.diplomska.tripplanner.service.impl;

import finki.diplomska.tripplanner.models.*;
import finki.diplomska.tripplanner.models.dto.LocationDto;
import finki.diplomska.tripplanner.models.dto.PlannerLocationDto;
import finki.diplomska.tripplanner.models.exceptions.CityNotFoundException;
import finki.diplomska.tripplanner.models.exceptions.CompanionNotFoundException;
import finki.diplomska.tripplanner.models.exceptions.LocationNotFoundException;
import finki.diplomska.tripplanner.models.exceptions.RegionNotFoundException;
import finki.diplomska.tripplanner.repository.jpa.*;
import finki.diplomska.tripplanner.service.LocationService;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;


@Service
public class LocationServiceImpl implements LocationService {

    private final JpaLocationRepository locationRepository;
    private final JpaPlannerRepository plannerRepository;
    private final JpaRegionRepository regionRepository;
    private final JpaCityRepository cityRepository;
    private final JpaUserRepository userRepository;
    private final JpaCategoryRepository categoryRepository;
    private final JpaCompanionRepository companionRepository;

    public LocationServiceImpl(JpaLocationRepository locationRepository, JpaPlannerRepository plannerRepository, JpaRegionRepository regionRepository, JpaCityRepository cityRepository, JpaUserRepository userRepository, JpaCategoryRepository categoryRepository, JpaCompanionRepository companionRepository) {
        this.locationRepository = locationRepository;
        this.plannerRepository = plannerRepository;
        this.regionRepository = regionRepository;
        this.cityRepository = cityRepository;
        this.userRepository = userRepository;
        this.categoryRepository = categoryRepository;
        this.companionRepository = companionRepository;
    }

    @Override
    public List<Location> findLocationsFromCity(String locName, String companion, List<String> categories) {
        return this.locationRepository.findLocationsFromCity(locName, companion, categories);
    }

    @Override
    public List<Location> findLocationsFromCountry(String locName, String companion, String region, List<String> categories) {
        return this.locationRepository.findLocationsFromCountry(locName, companion, region, categories);
    }

    @Override
    public List<Location> findAll() {
        return this.locationRepository.findAll();
    }

    @Override
    public Location getById(Long id) {
        Optional<Location> location = this.locationRepository.findById(id);
        if (!location.isPresent()) {
            throw new LocationNotFoundException(id);
        }
        return location.get();
    }

    @Override
    public Optional<Location> findById(Long id) {
        return this.locationRepository.findById(id);
    }

    @Override
    public List<Location> findLocationsFromCityForm(Long cityId, Long companionId, Long lengthOfStay, String categoryIds) {
        List<Long> categories = null;
        if(categoryIds != null && !categoryIds.isEmpty()){
            List<String> ids = Arrays.asList(categoryIds.split(","));
            categories = ids.stream().map(Long::valueOf).collect(Collectors.toList());
        }
        Long maxMinutesPerDay = lengthOfStay *6 * 60;
        int minutesPerDay = 0;
        List<Location> citylocations = this.locationRepository.findLocationsFromCityForm(cityId, companionId, categories);
        List<Location> newList = new ArrayList<>();
        int listSize = citylocations.size();

        while(minutesPerDay < maxMinutesPerDay ){
            for(Location l: citylocations) {
                if (minutesPerDay < maxMinutesPerDay && l.getDuration() + minutesPerDay <= maxMinutesPerDay && listSize != 0) {
                    newList.add(l);
                    listSize --;
                }
                minutesPerDay += l.getDuration();
                if (minutesPerDay > maxMinutesPerDay) {
                    break;
                }
            }
        }

        List<Location> foundLocations = locationRepository.findLocationsFromCityForm(cityId, companionId, categories);
        return newList;
    }

    @Override
    public List<Location> findLocationsFromRegionForm(Long regionId, Long companionId, Long lengthOfStay, String categoryIds) {
        List<Long> categories = null;
        if(categoryIds != null && !categoryIds.isEmpty()){
            List<String> ids = Arrays.asList(categoryIds.split(","));
            categories = ids.stream().map(Long::valueOf).collect(Collectors.toList());
        }
        Long maxMinutesPerDay = lengthOfStay *6 * 60;
        int minutesPerDay = 0;
        List<Location> countryLocations = this.locationRepository.findLocationsFromRegionForm(regionId, companionId, categories);
        List<Location> newList = new ArrayList<>();
        int listCountrySize = countryLocations.size();

            while(minutesPerDay < maxMinutesPerDay){
                for(Location l: countryLocations) {
                    if (minutesPerDay < maxMinutesPerDay && l.getDuration() + minutesPerDay <= maxMinutesPerDay && listCountrySize != 0) {
                        newList.add(l);
                        listCountrySize --;
                    }
                    minutesPerDay += l.getDuration();
                    if (minutesPerDay > maxMinutesPerDay) {
                        break;
                    }
                }

        }
        return newList;
    }


    @Override
    public List<Location> scheduleLocations(String locName, String companion, String region, List<String> categories, int numberOfDays) {
        int maxMinutesPerDay = numberOfDays *6 * 60;
        int minutesPerDay = 0;
        List<Location> locations = this.locationRepository.findLocationsFromCity(locName, companion, categories);
        List<Location> countryLocations = this.locationRepository.findLocationsFromCountry(locName, companion, region, categories);
        List<Location> newList = new ArrayList<>();
        int listSize = locations.size();
        int listCountrySize = countryLocations.size();

        if(locName.equals("Macedonia")){
            while(minutesPerDay < maxMinutesPerDay){
                for(Location l: countryLocations) {
                    if (minutesPerDay < maxMinutesPerDay && l.getDuration() + minutesPerDay <= maxMinutesPerDay && listCountrySize != 0) {
                        newList.add(l);
                        listCountrySize --;
                    }
                    minutesPerDay += l.getDuration();
                    if (minutesPerDay > maxMinutesPerDay) {
                        break;
                    }
                }
            }
        }else{
            while(minutesPerDay < maxMinutesPerDay ){
                for(Location l: locations) {
                    if (minutesPerDay < maxMinutesPerDay && l.getDuration() + minutesPerDay <= maxMinutesPerDay && listSize != 0) {
                        newList.add(l);
                        listSize --;
                    }
                    minutesPerDay += l.getDuration();
                    if (minutesPerDay > maxMinutesPerDay) {
                        break;
                    }
                }
            }
        }
        return newList;
    }

    @Override
    public Location addLocationToPlanner(PlannerLocationDto plannerLocationDto) {
        Location location = this.locationRepository.findById(plannerLocationDto.getLocationId())
                .orElseThrow(() -> new LocationNotFoundException(plannerLocationDto.getLocationId()));
        Planner planner = this.plannerRepository.getById(plannerLocationDto.getPlannerId());
        planner.getLocationList().add(location);
        return this.locationRepository.save(location);
    }

    @Override
    public List<Location> getAllLocationsForPlanner(Long plannerId) {
        return this.locationRepository.getAllLocationsForPlanner(plannerId);
    }

    @Override
    public List<Location> getWeekendGetaways() {
        return this.locationRepository.getWeekendGetaways();
    }

    @Override
    public List<Location> getVillages() {
        return this.locationRepository.getVillages();
    }

    @Override
    public List<Long> getAllLocationIdsForPlanner(Long plannerId) {
        return this.locationRepository.getAllLocationIdsForPlanner(plannerId);
    }

    @Override
    public List<Location> getAllLocations(String place) {
        return this.locationRepository.getAllLocations(place);
    }

    @Override
    public Optional<Location> save(LocationDto locationDto, String username) {
        City city = new City();
        Region region = this.regionRepository.findById(locationDto.getRegion())
                .orElseThrow(() -> new RegionNotFoundException(locationDto.getRegion()));
        if(locationDto.getCity() != null){
             city = this.cityRepository.findById(locationDto.getCity())
                    .orElseThrow(() -> new CityNotFoundException(locationDto.getCity()));
        }else{
            city = null;
        }
        User user = this.userRepository.findByUsername(username);
        locationDto.setUser(user.getUsername());
        return Optional.of(this.locationRepository.save(new Location(locationDto.getName(), locationDto.getDescription(), locationDto.getAddress(), locationDto.getPriority(),
                locationDto.getDuration(), locationDto.getTrivia(), locationDto.getPhoto(), region, city, user)));
    }

}
