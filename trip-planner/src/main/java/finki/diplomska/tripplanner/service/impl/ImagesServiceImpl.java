package finki.diplomska.tripplanner.service.impl;

import finki.diplomska.tripplanner.models.Images;
import finki.diplomska.tripplanner.repository.jpa.JpaImageRepository;
import finki.diplomska.tripplanner.service.ImagesService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ImagesServiceImpl implements ImagesService {

    private final JpaImageRepository jpaImageRepository;

    public ImagesServiceImpl(JpaImageRepository jpaImageRepository) {
        this.jpaImageRepository = jpaImageRepository;
    }

    @Override
    public List<Images> getAllImagesForLocation(Long locationId) {
        return this.jpaImageRepository.getAllImagesForLocation(locationId);
    }
}
