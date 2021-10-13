package finki.diplomska.tripplanner.service.impl;

import finki.diplomska.tripplanner.models.Region;
import finki.diplomska.tripplanner.repository.jpa.JpaRegionRepository;
import finki.diplomska.tripplanner.service.RegionService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RegionServiceImpl implements RegionService {

    private final JpaRegionRepository regionRepository;

    public RegionServiceImpl(JpaRegionRepository regionRepository) {
        this.regionRepository = regionRepository;
    }

    @Override
    public List<Region> findAll() {
        return this.regionRepository.findAll();
    }
}
