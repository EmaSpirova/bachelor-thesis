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
            "LEFT JOIN recommended_companion AS rc " +
            "ON l.id_location = rc.id_location " +
            "LEFT JOIN companions AS companion " +
            "ON rc.id_companion = companion.id_companion " +
            "LEFT JOIN locations_belong lb " +
            "ON l.id_location = lb.id_location " +
            "LEFT JOIN categories AS category " +
            "ON lb.id_category = category.id_category " +
            "LEFT JOIN cities AS city " +
            "ON city.id_city = l.id_city " +
            "WHERE city.id_city = :cityId and companion.id_companion = :companionId and category.id_category IN (:categoryIds) " +
            "GROUP BY l.id_location ORDER BY CASE l.priority WHEN 'high' THEN 1 WHEN 'medium' THEN 2 WHEN 'low' THEN 3 END", nativeQuery = true)
    List<Location> findLocationsFromCityForm(@Param("cityId") Long cityId, @Param("companionId") Long companionId, @Param("categoryIds") List<Long> categoryIds);

    @Query(value="SELECT * FROM locations AS location " +
            "LEFT JOIN recommended_companion AS rc " +
            "ON location.id_location = rc.id_location " +
            "LEFT JOIN companions AS companion " +
            "ON rc.id_companion = companion.id_companion " +
            "LEFT JOIN locations_belong lb " +
            "ON location.id_location = lb.id_location " +
            "LEFT JOIN categories AS category " +
            "ON lb.id_category = category.id_category " +
            "LEFT JOIN regions AS region " +
            "ON location.id_region = region.id_region " +
            "LEFT JOIN cities AS city " +
            "ON region.id_region  = city.id_region " +
            "AND city.id_city = location.id_city " +
            "WHERE region.id_region = :regionId AND companion.id_companion  = :companionId AND category.id_category  IN (:categoryIds) " +
            "GROUP BY location.id_location ORDER BY CASE location.priority WHEN 'high' THEN 1 WHEN 'medium' THEN 2 WHEN 'low' THEN 3 END", nativeQuery = true)
    List<Location> findLocationsFromRegionForm(@Param("regionId") Long regionId, @Param("companionId") Long companionId, @Param("categoryIds") List<Long> categoryIds);

    @Query(value = "SELECT * " +
            "FROM locations AS l " +
            "WHERE l.id_location IN " +
            "(SELECT pl.id_location FROM planners_contain AS pl WHERE pl.id_planner = :plannerId)", nativeQuery = true)
    List<Location> getAllLocationsForPlanner(@Param("plannerId") Long plannerId);


    @Query(value = "SELECT l.id_location " +
            "FROM locations AS l " +
            "WHERE l.id_location IN " +
            "(SELECT pl.id_location FROM planners_contain AS pl WHERE pl.id_planner = :plannerId)", nativeQuery = true)
    List<Long> getAllLocationIdsForPlanner(@Param("plannerId") Long plannerId);

    @Query(value = "SELECT *, if(l.id_city is NOT NULL, c.city_name, l.location_name) as result " +
            "FROM locations AS l " +
            "LEFT JOIN cities AS c " +
            "ON l.id_city = c.id_city " +
            "LEFT JOIN locations_belong AS lb " +
            "ON l.id_location = lb.id_location " +
            "WHERE lb.id_category=20", nativeQuery = true)
    List<Location> getWeekendGetaways();

    @Query(value = "SELECT *, if(l.id_city is NOT NULL, c.city_name, l.location_name) as result " +
            "FROM locations AS l " +
            "LEFT JOIN cities AS c " +
            "ON l.id_city = c.id_city " +
            "LEFT JOIN locations_belong AS lb " +
            "ON l.id_location = lb.id_location " +
            "WHERE lb.id_category=4", nativeQuery = true)
    List<Location> getVillages();

}
