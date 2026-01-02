package ro.budgetmanager.mapper;

import org.springframework.stereotype.Component;
import ro.budgetmanager.dto.GoalDto;
import ro.budgetmanager.entity.FinancialInfo;
import ro.budgetmanager.entity.Goal;

import java.util.List;

@Component
public class GoalMapper {

    public Goal toGoal(GoalDto goalDto, FinancialInfo financialInfo) {
        Goal goal = new Goal();
        goal.setName(goalDto.getName());
        goal.setTargetAmount(goalDto.getTargetAmount());
        goal.setCurrentAmount(goalDto.getCurrentAmount());
        goal.setFinancialInfo(financialInfo);
        return goal;
    }

    public GoalDto toGoalDto(Goal goal) {
        GoalDto goalDto = new GoalDto();
        goalDto.setId(goal.getId());
        goalDto.setName(goal.getName());
        goalDto.setCreatedAt(goal.getCreatedAt());
        goalDto.setTargetAmount(goal.getTargetAmount());
        goalDto.setCurrentAmount(goal.getCurrentAmount());
        return goalDto;
    }

    public List<GoalDto> toGoalDtos(List<Goal> goals) {
        if (goals == null) return List.of();
        return goals.stream()
                .map(this::toGoalDto)
                .toList();
    }
}
