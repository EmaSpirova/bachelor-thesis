package finki.diplomska.tripplanner.service.impl;

import finki.diplomska.tripplanner.models.City;
import finki.diplomska.tripplanner.repository.jpa.JpaCityRepository;
import finki.diplomska.tripplanner.repository.jpa.JpaCountryRepository;
import finki.diplomska.tripplanner.service.CityService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class CityServiceImpl implements CityService {

    private final JpaCityRepository cityRepository;


    public CityServiceImpl(JpaCityRepository cityRepository) {
        this.cityRepository = cityRepository;
    }

    @Override
    public List<City> findAll() {
        return this.cityRepository.findAll();
    }



}
