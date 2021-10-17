package finki.diplomska.tripplanner.service;


import finki.diplomska.tripplanner.models.Location;

import java.util.List;
import java.util.Optional;


public interface LocationService {
    List<Location> findLocationsFromCity(String locName, String companion, List<String> categories);
    List<Location> findAll();
    Location getById(Long id);
    List<Location> findLocationsFromCountry (String locName, String companion,String region, List<String> categories );
    List<Location> scheduleLocations(String locName, String companion,String region, List<String> categories, int numberOfDays);
    Optional<Location> findById(Long id);

    List<Location> findLocations(Long locationId, Long companionId, Long lengthOfStay, String categoryIds);
}
