package finki.diplomska.tripplanner.web.rest;


import finki.diplomska.tripplanner.models.Companion;
import finki.diplomska.tripplanner.service.CompanionService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(value = "/api")
public class CompanionRestController {

    private final CompanionService companionService;

    public CompanionRestController(CompanionService companionService) {
        this.companionService = companionService;
    }

    @GetMapping(value = "/companions")
    public List<Companion> findAllCompanios(){
        return this.companionService.findAll();
    }
}
