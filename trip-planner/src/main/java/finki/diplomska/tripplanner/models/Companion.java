package finki.diplomska.tripplanner.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "companions")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Companion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_companion")
    private Long id;

    private String type;

    @ManyToMany(mappedBy = "companionList")
    @JsonIgnore
    private List<Location> locationList;
}
