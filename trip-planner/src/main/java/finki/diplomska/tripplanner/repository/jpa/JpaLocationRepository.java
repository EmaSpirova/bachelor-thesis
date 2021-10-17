package finki.diplomska.tripplanner.repository.jpa;

import finki.diplomska.tripplanner.models.Location;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


import java.util.List;

@Repository
public interface JpaLocationRepository extends JpaRepository<Location, Long> {

    @Query(value = "SELECT  * FROM locations AS l  " +
            "LEFT JOIN recommended_companion AS rc ON l.id_location = rc.id_location " +
            "LEFT JOIN companions AS com ON rc.id_companion = com.id_companion " +
            "LEFT JOIN locations_belong lb ON l.id_location = lb.id_location " +
            "LEFT JOIN categories AS cate ON lb.id_category = cate.id_category " +
            "LEFT JOIN regions AS r" +
            " ON l.id_region = r.id_region" +
            " LEFT JOIN cities AS cit" +
            " ON r.id_region = cit.id_region AND cit.id_city = l.id_city " +
            "WHERE cit.city_name = :locName and com.type = :companion and cate.category_name in (:categories) " +
            "GROUP BY l.id_location " +
            "ORDER BY CASE l.priority WHEN 'high' THEN 1 WHEN 'medium' THEN 2 WHEN 'low' THEN 3 END", nativeQuery = true)
    List<Location> findLocationsFromCity(@Param("locName") String locName, @Param("companion") String companion, @Param("categories") List<String> categories);

    @Query(value = "SELECT * FROM locations AS l " +
            "LEFT JOIN recommended_companion AS rc ON l.id_location = rc.id_location " +
            "LEFT JOIN companions AS com " +
            "ON rc.id_companion = com.id_companion " +
            "LEFT JOIN locations_belong lb " +
            "ON l.id_location = lb.id_location " +
            "LEFT JOIN categories AS cate " +
            "ON lb.id_category = cate.id_category " +
            "LEFT JOIN regions AS r " +
            "ON l.id_region = r.id_region " +
            "LEFT JOIN countries AS country " +
            "ON r.id_country = country.id_country " +
            "LEFT JOIN cities AS c " +
            "ON r.id_region = c.id_region AND c.id_city = l.id_city" +
            " WHERE country.country_name = :locName and com.type = :companion and cate.category_name in (:categories) AND r.region_name = :region " +
            "GROUP BY l.id_location ORDER BY CASE l.priority WHEN 'high' THEN 1 WHEN 'medium' THEN 2 WHEN 'low' THEN 3 END", nativeQuery = true)
    List<Location> findLocationsFromCountry(@Param("locName") String ime, @Param("companion") String companion, @Param("region") String region, @Param("categories") List<String> categories);

    @Query(value = "SELECT  * FROM locations AS l  " +
            "LEFT JOIN recommended_companion AS rc ON l.id_location = rc.id_location " +
            "LEFT JOIN companions AS com ON rc.id_companion = com.id_companion " +
            "LEFT JOIN locations_belong lb ON l.id_location = lb.id_location " +
            "LEFT JOIN categories AS cate ON lb.id_category = cate.id_category " +
            "LEFT JOIN regions AS r" +
            " ON l.id_region = r.id_region" +
            " LEFT JOIN cities AS cit" +
            " ON r.id_region = cit.id_region AND cit.id_city = l.id_city " +
            "WHERE cit.id_city = :locationId and com.id_companion = :companionId and cate.id_category in (:categories) " +
            "GROUP BY l.id_location " +
            "ORDER BY CASE l.priority WHEN 'high' THEN 1 WHEN 'medium' THEN 2 WHEN 'low' THEN 3 END", nativeQuery = true)
    List<Location> findLocationsFromForm(@Param("locationId") Long locationId, @Param("companionId") Long companionId, @Param("categories") List<Long> categories);
}
