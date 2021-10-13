package finki.diplomska.tripplanner.models.dto;

import finki.diplomska.tripplanner.models.Location;
import lombok.Data;

import java.util.List;

@Data
public class PlannerDto {

    private String name;
    private String description;
    private List<Long> locationList;

    public PlannerDto(String name, String description, List<Long> locationList) {
        this.name = name;
        this.description = description;
        this.locationList = locationList;
    }
}
