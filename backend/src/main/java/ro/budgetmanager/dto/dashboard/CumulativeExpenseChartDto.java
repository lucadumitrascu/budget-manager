package ro.budgetmanager.dto.dashboard;

import java.math.BigDecimal;
import java.util.List;

public class CumulativeExpenseChartDto {

    private List<String> dayLabels;
    private List<BigDecimal> cumulativeAmounts;
    private BigDecimal totalLine;

    public CumulativeExpenseChartDto(List<String> dayLabels, List<BigDecimal> cumulativeAmounts, BigDecimal totalLine) {
        this.dayLabels = dayLabels;
        this.cumulativeAmounts = cumulativeAmounts;
        this.totalLine = totalLine;
    }

    public CumulativeExpenseChartDto() {
    }

    public List<String> getDayLabels() {
        return dayLabels;
    }

    public void setDayLabels(List<String> dayLabels) {
        this.dayLabels = dayLabels;
    }

    public List<BigDecimal> getCumulativeAmounts() {
        return cumulativeAmounts;
    }

    public void setCumulativeAmounts(List<BigDecimal> cumulativeAmounts) {
        this.cumulativeAmounts = cumulativeAmounts;
    }

    public BigDecimal getTotalLine() {
        return totalLine;
    }

    public void setTotalLine(BigDecimal totalLine) {
        this.totalLine = totalLine;
    }
}
