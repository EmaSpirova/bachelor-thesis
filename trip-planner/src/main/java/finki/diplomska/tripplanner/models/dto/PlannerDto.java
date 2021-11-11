package finki.diplomska.tripplanner.models.dto;

import lombok.Data;

import java.util.List;

@Data
public class PlannerDto {

    private String name;
    private String description;

    public PlannerDto(String name, String description) {
        this.name = name;
        this.description = description;
    }
}
