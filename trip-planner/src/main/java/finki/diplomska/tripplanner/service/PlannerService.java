package finki.diplomska.tripplanner.service;

import finki.diplomska.tripplanner.models.Location;
import finki.diplomska.tripplanner.models.Planner;
import finki.diplomska.tripplanner.models.dto.PlannerDto;

import java.util.List;
import java.util.Optional;

public interface PlannerService {

        Planner createPlannerWithRequestParams(String description, String name, List<Location> locationList);
        Optional<Planner> editPlanner(Long id, PlannerDto plannerDto, String username);
        List<Planner> getAllPlaners();
        List<Planner> getPlannersByUser(String username);
        Optional<Planner> findById(Long id);
        Planner editPlannerWithRequestParams(Long id, String description, String name, List<Location> locationList);
        Optional<Planner> newPlanner(PlannerDto plannerDto, String username);
}
