package com.college.predictor.service;

import com.college.predictor.model.College;
import com.college.predictor.repository.CollegeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CollegeService {

    @Autowired
    private CollegeRepository collegeRepository;

    public List<College> getAllColleges() {
        return collegeRepository.findAll();
    }

    public List<College> getTop75Colleges() {
        return collegeRepository.findTop75CollegesOrderByNirfRankAsc();
    }

    public List<College> getCollegesByType(String type) {
        return collegeRepository.findByTypeOrderByNirfRankAsc(type);
    }

    public List<College> searchColleges(String searchTerm, String state, String type, String exam) {
        List<College> allColleges = collegeRepository.findAll();
        
        return allColleges.stream()
                .filter(college -> {
                    // Search term filter (name, location, city)
                    if (searchTerm != null && !searchTerm.trim().isEmpty()) {
                        String search = searchTerm.toLowerCase().trim();
                        boolean matchesSearch = college.getName().toLowerCase().contains(search) ||
                                              college.getLocation().toLowerCase().contains(search) ||
                                              college.getCity().toLowerCase().contains(search);
                        if (!matchesSearch) return false;
                    }
                    
                    // State filter
                    if (state != null && !state.trim().isEmpty() && 
                        !college.getState().toLowerCase().contains(state.toLowerCase())) {
                        return false;
                    }
                    
                    // Type filter
                    if (type != null && !type.trim().isEmpty() && 
                        !college.getType().toLowerCase().contains(type.toLowerCase())) {
                        return false;
                    }
                    
                    // Exam filter
                    if (exam != null && !exam.trim().isEmpty() && 
                        !college.getExamShortName().toLowerCase().contains(exam.toLowerCase())) {
                        return false;
                    }
                    
                    return true;
                })
                .sorted((a, b) -> {
                    // Sort by NIRF rank if available, then by name
                    if (a.getNirfRank() != null && b.getNirfRank() != null) {
                        return a.getNirfRank().compareTo(b.getNirfRank());
                    }
                    if (a.getNirfRank() != null) return -1;
                    if (b.getNirfRank() != null) return 1;
                    return a.getName().compareToIgnoreCase(b.getName());
                })
                .toList();
    }

    public List<College> searchCollegesByTypeAndName(String type, String searchTerm) {
        return collegeRepository.searchCollegesByTypeAndName(type, searchTerm);
    }

    public College getCollegeById(Long id) {
        return collegeRepository.findById(id).orElse(null);
    }

    public List<College> predictColleges(String examType, Integer rank, String category, String branch, String location) {
        // Basic prediction logic based on rank and college type
        List<College> allColleges = collegeRepository.findAll();
        
        return allColleges.stream()
                .filter(college -> {
                    // Filter by location if specified
                    if (location != null && !location.isEmpty() && 
                        !college.getLocation().toLowerCase().contains(location.toLowerCase())) {
                        return false;
                    }
                    
                    // Filter by type if specified
                    if (branch != null && !branch.isEmpty() && 
                        !college.getType().toLowerCase().contains(branch.toLowerCase())) {
                        return false;
                    }
                    
                    // Basic eligibility based on rank and college tier
                    return isEligible(college, rank, category);
                })
                .limit(20) // Limit to top 20 predictions
                .toList();
    }

    private boolean isEligible(College college, Integer rank, String category) {
        String collegeType = college.getType();
        Integer nirfRank = college.getNirfRank();
        
        if (rank == null) return false;
        
        // Basic eligibility logic based on college type and rank
        switch (collegeType.toUpperCase()) {
            case "IIT":
                return isEligibleForIIT(rank, category, nirfRank);
            case "NIT":
                return isEligibleForNIT(rank, category, nirfRank);
            case "IIIT":
                return isEligibleForIIIT(rank, category, nirfRank);
            case "Private":
                return isEligibleForPrivate(rank, category);
            default:
                return isEligibleForState(rank, category);
        }
    }

    private boolean isEligibleForIIT(Integer rank, String category, Integer nirfRank) {
        // IIT eligibility based on JEE Advanced rank
        if (nirfRank <= 10) {
            return rank <= 5000; // Top IITs
        } else if (nirfRank <= 20) {
            return rank <= 10000; // Mid-tier IITs
        } else {
            return rank <= 15000; // New IITs
        }
    }

    private boolean isEligibleForNIT(Integer rank, String category, Integer nirfRank) {
        // NIT eligibility based on JEE Main rank
        if (nirfRank <= 15) {
            return rank <= 20000; // Top NITs
        } else if (nirfRank <= 30) {
            return rank <= 50000; // Mid-tier NITs
        } else {
            return rank <= 80000; // Other NITs
        }
    }

    private boolean isEligibleForIIIT(Integer rank, String category, Integer nirfRank) {
        // IIIT eligibility based on JEE Main rank
        return rank <= 25000; // Most IIITs have similar cutoffs
    }

    private boolean isEligibleForPrivate(Integer rank, String category) {
        // Private colleges usually have higher cutoffs for general category
        if ("general".equalsIgnoreCase(category)) {
            return rank <= 100000; // General category
        } else {
            return rank <= 200000; // Other categories
        }
    }

    private boolean isEligibleForState(Integer rank, String category) {
        // State government colleges
        if ("general".equalsIgnoreCase(category)) {
            return rank <= 150000; // General category
        } else {
            return rank <= 300000; // Other categories
        }
    }
}
