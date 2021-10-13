package finki.diplomska.tripplanner;

import com.ulisesbocchio.jasyptspringboot.annotation.EnableEncryptableProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@EnableEncryptableProperties
public class TripPlannerApplication {

    public static void main(String[] args) {
        SpringApplication.run(TripPlannerApplication.class, args);
    }

}
