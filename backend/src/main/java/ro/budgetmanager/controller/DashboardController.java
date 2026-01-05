package ro.budgetmanager.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ro.budgetmanager.dto.ApiResponseDto;
import ro.budgetmanager.dto.dashboard.DashboardDto;
import ro.budgetmanager.service.DashboardService;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping("/data")
    public ResponseEntity<ApiResponseDto<DashboardDto>> getDashboardData(@RequestParam(defaultValue = "last30") String period) {
        return dashboardService.getDashboardData(period);
    }
}
