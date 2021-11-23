package finki.diplomska.tripplanner.web.rest;

import finki.diplomska.tripplanner.models.Images;
import finki.diplomska.tripplanner.service.ImagesService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(value = "/api")
public class ImagesRestController {
    private final ImagesService imagesService;

    public ImagesRestController(ImagesService imagesService) {
        this.imagesService = imagesService;
    }

    @GetMapping(value = "/images")
    public List<Images> getAllImagesForLocation(@RequestParam Long locationId){
        return this.imagesService.getAllImagesForLocation(locationId);
    }
}
