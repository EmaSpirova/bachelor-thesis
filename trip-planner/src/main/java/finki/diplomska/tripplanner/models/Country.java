package finki.diplomska.tripplanner.models;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "countries")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Country {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_country")
    private Long id;

    @Column(name = "country_name")
    private String name;

    @OneToMany(mappedBy = "country", cascade = CascadeType.REMOVE, orphanRemoval = true)
    @JsonManagedReference
    private List<Region> regionList;
}
