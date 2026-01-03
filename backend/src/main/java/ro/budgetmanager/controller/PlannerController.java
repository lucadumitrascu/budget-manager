package ro.budgetmanager.controller;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ro.budgetmanager.dto.ApiResponseDto;
import ro.budgetmanager.dto.PlannerDto;
import ro.budgetmanager.service.PlannerService;

@RestController
@RequestMapping("/api/planner")
public class PlannerController {

    private final PlannerService plannerService;

    public PlannerController(PlannerService plannerService) {
        this.plannerService = plannerService;
    }

    @GetMapping
    public ResponseEntity<ApiResponseDto<PlannerDto>> getPlanner() {
        return plannerService.getPlanner();
    }

    @PutMapping
    public ResponseEntity<ApiResponseDto<String>> updatePlannerSettings(@Valid @RequestBody PlannerDto plannerDto) {
        return plannerService.updatePlannerSettings(plannerDto);
    }
}
