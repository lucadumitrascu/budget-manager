package ro.budgetmanager.mapper;

import org.springframework.stereotype.Component;
import ro.budgetmanager.dto.ExpenseDto;
import ro.budgetmanager.entity.Category;
import ro.budgetmanager.entity.Expense;

import java.util.List;

@Component
public class ExpenseMapper {

    public Expense toExpense(ExpenseDto expenseDto, Category category) {
        Expense expense = new Expense();
        expense.setId(expenseDto.getId());
        expense.setAmount(expenseDto.getAmount());
        expense.setCategory(category);
        expense.setDescription(expenseDto.getDescription());
        return expense;
    }

    public ExpenseDto toExpenseDto(Expense expense) {
        ExpenseDto expenseDto = new ExpenseDto();
        expenseDto.setId(expense.getId());
        expenseDto.setAmount(expense.getAmount());
        expenseDto.setCategory(expense.getCategory().getName());
        expenseDto.setCreatedAt(expense.getCreatedAt());
        expenseDto.setDescription(expense.getDescription());
        return expenseDto;
    }

    public List<ExpenseDto> toExpenseDtos(List<Expense> expenses) {
        if (expenses == null) return List.of();
        return expenses.stream()
                .map(this::toExpenseDto)
                .toList();
    }
}
