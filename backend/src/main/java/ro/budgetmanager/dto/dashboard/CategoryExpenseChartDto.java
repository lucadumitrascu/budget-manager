package ro.budgetmanager.dto.dashboard;

import java.math.BigDecimal;
import java.util.List;

public class CategoryExpenseChartDto {

    private List<String> categoryLabels;
    private List<BigDecimal> categoryAmounts;

    public CategoryExpenseChartDto(List<String> categoryLabels, List<BigDecimal> categoryAmounts) {
        this.categoryLabels = categoryLabels;
        this.categoryAmounts = categoryAmounts;
    }

    public CategoryExpenseChartDto() {
    }

    public List<String> getCategoryLabels() {
        return categoryLabels;
    }

    public void setCategoryLabels(List<String> categoryLabels) {
        this.categoryLabels = categoryLabels;
    }

    public List<BigDecimal> getCategoryAmounts() {
        return categoryAmounts;
    }

    public void setCategoryAmounts(List<BigDecimal> categoryAmounts) {
        this.categoryAmounts = categoryAmounts;
    }
}
