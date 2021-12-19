package finki.diplomska.tripplanner.models.dto;

import lombok.Data;


@Data
public class PlannerDto {

    private String name;
    private String description;
    private String user;

    public PlannerDto(String name, String description, String user) {
        this.name = name;
        this.description = description;
        this.user = user;
    }
}
