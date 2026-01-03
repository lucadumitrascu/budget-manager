package ro.budgetmanager.mapper;

import org.springframework.stereotype.Component;
import ro.budgetmanager.dto.PlannerDto;
import ro.budgetmanager.entity.Planner;

@Component
public class PlannerMapper {

    public PlannerDto toPlannerDto(Planner planner) {
        PlannerDto plannerDto = new PlannerDto();
        plannerDto.setMonthlyBudget(planner.getMonthlyBudget());
        if (planner.getSelectedGoal() != null) {
            plannerDto.setSelectedGoalId(planner.getSelectedGoal().getId());
        }
        return plannerDto;
    }
}
