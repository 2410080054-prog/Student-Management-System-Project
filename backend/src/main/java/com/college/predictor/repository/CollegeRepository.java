package com.college.predictor.repository;

import com.college.predictor.model.College;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CollegeRepository extends JpaRepository<College, Long> {
    
    @Query("SELECT c FROM College c WHERE c.type = :type ORDER BY c.nirfRank ASC")
    List<College> findByTypeOrderByNirfRankAsc(String type);
    
    @Query("SELECT c FROM College c WHERE c.nirfRank <= 75 ORDER BY c.nirfRank ASC")
    List<College> findTop75CollegesOrderByNirfRankAsc();
    
    @Query("SELECT c FROM College c WHERE " +
           "LOWER(c.name) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(c.location) LIKE LOWER(CONCAT('%', :searchTerm, '%')) " +
           "ORDER BY c.nirfRank ASC")
    List<College> searchColleges(String searchTerm);
    
    @Query("SELECT c FROM College c WHERE " +
           "c.type = :type AND " +
           "LOWER(c.name) LIKE LOWER(CONCAT('%', :searchTerm, '%')) " +
           "ORDER BY c.nirfRank ASC")
    List<College> searchCollegesByTypeAndName(String type, String searchTerm);
}
