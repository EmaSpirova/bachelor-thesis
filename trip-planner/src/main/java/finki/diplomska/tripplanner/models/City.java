package finki.diplomska.tripplanner.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "cities")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class City {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_city")
    private Long id;

    @Column(name = "city_name")
    private String name;

    @Column(name = "city_description")
    private String description;

    @ManyToOne
    @JoinColumn(name = "id_region", nullable = false)
    @JsonBackReference
    private Region region;

    @OneToMany(mappedBy = "city", cascade = CascadeType.REMOVE, orphanRemoval = true)
    @JsonManagedReference
    private List<Location> locationList;


}
