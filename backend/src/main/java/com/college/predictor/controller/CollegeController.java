package com.college.predictor.controller;

import com.college.predictor.model.College;
import com.college.predictor.service.CollegeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/colleges")
@CrossOrigin(origins = "http://localhost:3000")
public class CollegeController {

    @Autowired
    private CollegeService collegeService;

    @GetMapping
    public ResponseEntity<List<College>> getAllColleges() {
        List<College> colleges = collegeService.getAllColleges();
        return ResponseEntity.ok(colleges);
    }

    @GetMapping("/top75")
    public ResponseEntity<List<College>> getTop75Colleges() {
        List<College> colleges = collegeService.getTop75Colleges();
        return ResponseEntity.ok(colleges);
    }

    @GetMapping("/type/{type}")
    public ResponseEntity<List<College>> getCollegesByType(@PathVariable String type) {
        List<College> colleges = collegeService.getCollegesByType(type);
        return ResponseEntity.ok(colleges);
    }

    @GetMapping("/search")
    public ResponseEntity<List<College>> searchColleges(
            @RequestParam(required = false) String q,
            @RequestParam(required = false) String state,
            @RequestParam(required = false) String type,
            @RequestParam(required = false) String exam
    ) {
        List<College> colleges = collegeService.searchColleges(q, state, type, exam);
        return ResponseEntity.ok(colleges);
    }

    @GetMapping("/{id}")
    public ResponseEntity<College> getCollegeById(@PathVariable Long id) {
        College college = collegeService.getCollegeById(id);
        if (college != null) {
            return ResponseEntity.ok(college);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/predict")
    public ResponseEntity<List<College>> predictColleges(@RequestBody PredictionRequest request) {
        List<College> predictions = collegeService.predictColleges(
            request.getExamType(),
            request.getRank(),
            request.getCategory(),
            request.getBranch(),
            request.getLocation()
        );
        return ResponseEntity.ok(predictions);
    }
}

class PredictionRequest {
    private String examType;
    private Integer rank;
    private String category;
    private String branch;
    private String location;

    // Getters and Setters
    public String getExamType() { return examType; }
    public void setExamType(String examType) { this.examType = examType; }

    public Integer getRank() { return rank; }
    public void setRank(Integer rank) { this.rank = rank; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getBranch() { return branch; }
    public void setBranch(String branch) { this.branch = branch; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
}
