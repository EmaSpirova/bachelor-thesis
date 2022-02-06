package finki.diplomska.tripplanner.models.dto;

import finki.diplomska.tripplanner.models.*;
import lombok.Data;

import java.util.List;

@Data
public class LocationDto {

    private String name;

    private String description;

    private String address;

    private String priority;

    private int duration;

    private String trivia;

    private byte[] photo;

    private Long region;

    private Long city;

    private String user;

    private List<Long> companions;

    private List<Long> categories;


    public LocationDto(String name, String description, String address, String priority, int duration, String trivia, byte[] photo, Long region, Long city, String user ) {
        this.name = name;
        this.description = description;
        this.address = address;
        this.priority = priority;
        this.duration = duration;
        this.trivia = trivia;
        this.photo = photo;
        this.region = region;
        this.city = city;
        this.user = user;
        this.companions = companions;
        this.categories = categories;
    }
    public LocationDto() {
    }
}
