package ro.budgetmanager.controller;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ro.budgetmanager.dto.ApiResponseDto;
import ro.budgetmanager.dto.GoalDto;
import ro.budgetmanager.service.GoalService;

import java.util.List;

@RestController
@RequestMapping("/api/goals")
public class GoalController {

    private final GoalService goalService;

    public GoalController(GoalService goalService) {
        this.goalService = goalService;
    }

    @GetMapping
    public ResponseEntity<ApiResponseDto<List<GoalDto>>> getGoals() {
        return goalService.getGoals();
    }

    @PostMapping
    public ResponseEntity<ApiResponseDto<GoalDto>> createGoal(@Valid @RequestBody GoalDto goalDto) {
        return goalService.createGoal(goalDto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponseDto<String>> updateGoal(@PathVariable("id") Integer id, @Valid @RequestBody GoalDto goalDto) {
        return goalService.updateGoal(id, goalDto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponseDto<String>> deleteGoal(@PathVariable("id") Integer id) {
        return goalService.deleteGoal(id);
    }

    @PutMapping("/{id}/withdraw")
    public ResponseEntity<ApiResponseDto<String>> withdrawFundsFromGoal(@PathVariable Integer id) {
        return goalService.withdrawFundsFromGoal(id);
    }
}
