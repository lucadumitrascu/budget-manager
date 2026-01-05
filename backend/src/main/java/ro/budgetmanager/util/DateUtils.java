package ro.budgetmanager.util;

import java.time.LocalDateTime;
import java.time.LocalDate;
import java.time.YearMonth;

public class DateUtils {

    public static LocalDateTime[] getDateIntervalFromPeriod(String period) {
        LocalDate today = LocalDate.now();
        LocalDateTime start, end;

        switch (period) {
            case "last7":
                start = today.minusDays(6).atStartOfDay();
                end = endOfDay(today);
                break;
            case "thisMonth":
                start = today.withDayOfMonth(1).atStartOfDay();
                end = endOfDay(today);
                break;
            case "lastMonth":
                YearMonth lastMonth = YearMonth.from(today).minusMonths(1);
                start = lastMonth.atDay(1).atStartOfDay();
                end = endOfDay(lastMonth.atEndOfMonth());
                break;
            case "last3months":
                start = today.minusMonths(3).withDayOfMonth(1).atStartOfDay();
                end = endOfDay(today);
                break;
            case "last6months":
                start = today.minusMonths(6).withDayOfMonth(1).atStartOfDay();
                end = endOfDay(today);
                break;
            case "thisYear":
                start = today.withDayOfYear(1).atStartOfDay();
                end = endOfDay(today);
                break;
            case "last12months":
                start = today.minusMonths(12).withDayOfMonth(1).atStartOfDay();
                end = endOfDay(today);
                break;
            case "allTime":
                start = LocalDate.of(2026, 1, 1).atStartOfDay();
                end = endOfDay(today);
                break;
            default:
                start = today.minusDays(29).atStartOfDay();
                end = endOfDay(today);
        }

        return new LocalDateTime[]{start, end};
    }

    private static LocalDateTime endOfDay(LocalDate date) {
        return date.atTime(23, 59, 59);
    }
}
