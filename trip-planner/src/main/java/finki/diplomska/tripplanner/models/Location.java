package finki.diplomska.tripplanner.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import net.minidev.json.annotate.JsonIgnore;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "locations")
@AllArgsConstructor
@Getter
@Setter
public class Location {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_location")
    private Long id;

    @Column(name = "location_name")
    private String name;

    @Column(name = "location_description")
    private String description;

    private String address;

    private String priority;

    private int duration;

    private String trivia;

    @Lob
    @JsonIgnore
    private byte[] photo;


    @ManyToMany
    @JoinTable(
            name = "recommended_companion",
            joinColumns = @JoinColumn(name = "id_location"),
            inverseJoinColumns = @JoinColumn(name = "id_companion"))
    @com.fasterxml.jackson.annotation.JsonIgnore
        private List<Companion> companionList;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "id_region", nullable = false)
    private Region region;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "id_city", nullable = true)
    private City city;

    @ManyToMany(mappedBy = "locationList")
    @com.fasterxml.jackson.annotation.JsonIgnore
    private List<Planner> plannerList;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "id_user")
    private User user;

    @ManyToMany
    @JoinTable(
            name = "locations_belong",
            joinColumns = @JoinColumn(name = "id_location"),
            inverseJoinColumns = @JoinColumn(name = "id_category"))
    @com.fasterxml.jackson.annotation.JsonIgnore
    private List<Category> categoryList;

    @OneToMany(mappedBy = "location", cascade = CascadeType.REMOVE, orphanRemoval = true)
    @JsonManagedReference
    private List<Images> imagesList;

    public Location(String name, String description, String address, String priority, int duration, String trivia, byte[] photo, Region region, City city, User user) {
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
    }

    public Location() {
    }
}
