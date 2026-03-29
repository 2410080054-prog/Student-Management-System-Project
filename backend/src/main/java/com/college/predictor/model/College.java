package com.college.predictor.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "colleges")
public class College {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String name;
    
    @Column(name = "location")
    private String location;
    
    @Column(name = "state")
    private String state;
    
    @Column(name = "city")
    private String city;
    
    @Column(name = "type")
    private String type;
    
    @Column(name = "established_year")
    private Integer establishedYear;
    
    @Column(name = "nirf_rank")
    private Integer nirfRank;
    
    @Column(name = "website")
    private String website;
    
    @Column(name = "exam_short_name")
    private String examShortName;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    // Constructors
    public College() {}
    
    public College(String name, String location, String type, Integer establishedYear, Integer nirfRank) {
        this.name = name;
        this.location = location;
        this.type = type;
        this.establishedYear = establishedYear;
        this.nirfRank = nirfRank;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    
    public String getState() { return state; }
    public void setState(String state) { this.state = state; }
    
    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }
    
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    
    public Integer getEstablishedYear() { return establishedYear; }
    public void setEstablishedYear(Integer establishedYear) { this.establishedYear = establishedYear; }
    
    public Integer getNirfRank() { return nirfRank; }
    public void setNirfRank(Integer nirfRank) { this.nirfRank = nirfRank; }
    
    public String getWebsite() { return website; }
    public void setWebsite(String website) { this.website = website; }
    
    public String getExamShortName() { return examShortName; }
    public void setExamShortName(String examShortName) { this.examShortName = examShortName; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
