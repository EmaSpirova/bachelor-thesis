package finki.diplomska.tripplanner.service.impl;

import finki.diplomska.tripplanner.models.Country;
import finki.diplomska.tripplanner.repository.jpa.JpaCountryRepository;
import finki.diplomska.tripplanner.service.CountryService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CountryServiceImpl implements CountryService {

    private final JpaCountryRepository countryRepository;

    public CountryServiceImpl(JpaCountryRepository countryRepository) {
        this.countryRepository = countryRepository;
    }

    @Override
    public List<Country> findAll() {
        return this.countryRepository.findAll();
    }
}
