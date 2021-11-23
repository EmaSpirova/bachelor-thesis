package finki.diplomska.tripplanner.service;

import finki.diplomska.tripplanner.models.Images;

import java.util.List;

public interface ImagesService {
    List<Images> getAllImagesForLocation(Long locationId);
}
