package ro.budgetmanager.dto.dashboard;

import java.math.BigDecimal;
import java.util.List;

public class GoalSavingChartDto {

    private List<String> goalLabels;
    private List<BigDecimal> savedPercentages;

    public GoalSavingChartDto(List<String> goalLabels, List<BigDecimal> savedPercentages) {
        this.goalLabels = goalLabels;
        this.savedPercentages = savedPercentages;
    }

    public GoalSavingChartDto() {
    }

    public List<String> getGoalLabels() {
        return goalLabels;
    }

    public void setGoalLabels(List<String> goalLabels) {
        this.goalLabels = goalLabels;
    }

    public List<BigDecimal> getSavedPercentages() {
        return savedPercentages;
    }

    public void setSavedPercentages(List<BigDecimal> savedPercentages) {
        this.savedPercentages = savedPercentages;
    }
}
