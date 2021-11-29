package finki.diplomska.tripplanner.models.dto;


import lombok.Data;

import java.util.Date;

@Data
public class UserDto {
    private String username;

    private String fullName;

    private String password;

    private String confirmPassword;

    private Date create_At;

    private Date update_At;

    public UserDto(String username, String fullName, String password, String confirmPassword, Date create_At, Date update_At) {
        this.username = username;
        this.fullName = fullName;
        this.password = password;
        this.confirmPassword = confirmPassword;
        this.create_At = create_At;
        this.update_At = update_At;
    }
}
