package finki.diplomska.tripplanner.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
@Table(name = "planners")
@AllArgsConstructor
@Getter
@Setter
public class Planner {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_planner")
    private Long id;

    @Column(name = "planner_name")
    private String name;

    @Column(name = "planner_description")
    private String description;

    @ManyToMany()
    @JoinTable(
            name = "planners_contain",
            joinColumns = @JoinColumn(name = "id_planner"),
            inverseJoinColumns = @JoinColumn(name = "id_location"))
    private List<Location> locationList;

    @ManyToOne(fetch = FetchType.EAGER)
    private User user;

    public Planner(){
    }

    public Planner(String name, String description, List<Location> locationList, User user){
            this.name = name;
            this.description = description;
            this.locationList = locationList;
            this.user = user;
    }

    public static synchronized Planner createNewPlanner(String plandesc, String planname, List<Location> locationList){
        Planner planner = new Planner();
        planner.description = plandesc;
        planner.name = planname;
        planner.locationList = locationList;
        return planner;
    }

}
