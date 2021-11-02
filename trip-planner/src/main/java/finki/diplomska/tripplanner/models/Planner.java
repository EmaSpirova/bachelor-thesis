package finki.diplomska.tripplanner.models;

import lombok.*;
import reactor.util.annotation.Nullable;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
@Table(name = "planners")
@NoArgsConstructor
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

    @ManyToMany
    @JoinTable(
            name = "planners_contain",
            joinColumns = @JoinColumn(name = "id_planner"),
            inverseJoinColumns = @JoinColumn(name = "id_location"))
    private List<Location> locationList;


    public Planner(String name, String description, List<Location> locationList){
            this.name = name;
            this.description = description;
            this.locationList = locationList;
    }

    public static synchronized Planner createNewPlanner(String plandesc, String planname, List<Location> locationList){
        Planner planner = new Planner();
        planner.description = plandesc;
        planner.name = planname;
        planner.locationList = locationList;
        return planner;
    }

}
