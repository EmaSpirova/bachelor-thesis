package finki.diplomska.tripplanner.service.impl;

import finki.diplomska.tripplanner.models.Companion;
import finki.diplomska.tripplanner.repository.jpa.JpaCompanionRepository;
import finki.diplomska.tripplanner.service.CompanionService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CompanionServiceImpl implements CompanionService {

    private final JpaCompanionRepository companionRepository;

    public CompanionServiceImpl(JpaCompanionRepository companionRepository) {
        this.companionRepository = companionRepository;
    }

    @Override
    public List<Companion> findAll() {
        return companionRepository.findAll();
    }
}
