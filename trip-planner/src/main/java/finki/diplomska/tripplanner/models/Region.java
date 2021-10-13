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
@Table(name = "regions")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Region {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_region")
    private Long id;

    @Column(name = "region_name")
    private String name;

    @ManyToOne
    @JoinColumn(name = "id_country", nullable = false)
    @JsonBackReference
    private Country country;


    @OneToMany(mappedBy = "region", cascade = CascadeType.REMOVE, orphanRemoval = true)
    @JsonManagedReference
    private List<City> cityList;

    @OneToMany (mappedBy = "region", cascade = CascadeType.REMOVE, orphanRemoval = true)
    @JsonManagedReference
    private List<Location> locationList;

}
