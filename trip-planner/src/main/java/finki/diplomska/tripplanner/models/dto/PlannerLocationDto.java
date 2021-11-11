package finki.diplomska.tripplanner.models.dto;

import lombok.Data;

@Data
public class PlannerLocationDto {
    private Long locationId;
    private Long plannerId;

    public PlannerLocationDto() {
    }

    public PlannerLocationDto(Long locationId, Long plannerId) {
        this.locationId = locationId;
        this.plannerId = plannerId;
    }
}
