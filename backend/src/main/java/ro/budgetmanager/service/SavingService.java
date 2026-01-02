package ro.budgetmanager.service;

import jakarta.transaction.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import ro.budgetmanager.dto.ApiResponseDto;
import ro.budgetmanager.dto.SavingDto;
import ro.budgetmanager.entity.Goal;
import ro.budgetmanager.entity.Saving;
import ro.budgetmanager.entity.User;
import ro.budgetmanager.mapper.SavingMapper;
import ro.budgetmanager.repository.GoalRepository;
import ro.budgetmanager.repository.SavingRepository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import static ro.budgetmanager.util.ApiUtils.buildResponse;

@Service
public class SavingService {

    private final SavingRepository savingRepository;
    private final SavingMapper savingMapper;
    private final GoalRepository goalRepository;
    private final FinancialInfoService financialInfoService;
    private final AuthService authService;

    public SavingService(SavingRepository savingRepository,
                         SavingMapper savingMapper,
                         GoalRepository goalRepository,
                         FinancialInfoService financialInfoService,
                         AuthService authService) {
        this.savingRepository = savingRepository;
        this.savingMapper = savingMapper;
        this.goalRepository = goalRepository;
        this.financialInfoService = financialInfoService;
        this.authService = authService;
    }

    public ResponseEntity<ApiResponseDto<List<SavingDto>>> getSavings() {
        User user = authService.getAuthenticatedUser();

        List<Saving> savings = savingRepository
                .findByGoal_FinancialInfo_Id(user.getFinancialInfo().getId());
        return buildResponse("Savings have been successfully retrieved.",
                savingMapper.toSavingDtos(savings), HttpStatus.OK);
    }

    @Transactional
    public ResponseEntity<ApiResponseDto<SavingDto>> createSaving(SavingDto savingDto) {
        User user = authService.getAuthenticatedUser();

        Optional<Goal> goalOptional = goalRepository
                .findByNameAndFinancialInfo(savingDto.getGoal(), user.getFinancialInfo());
        if (goalOptional.isEmpty()) {
            return buildResponse("Goal not found.", null, HttpStatus.NOT_FOUND);
        }
        Goal goal = goalOptional.get();

        if (user.getFinancialInfo().getBudget().compareTo(savingDto.getAmount()) < 0) {
            return buildResponse("Insufficient funds for this operation.", null, HttpStatus.BAD_REQUEST);
        }

        Saving saving = savingMapper.toSaving(savingDto, goal);
        savingRepository.save(saving);
        adjustBudgetAndGoal(user, saving, goal);

        savingDto = savingMapper.toSavingDto(saving);
        return buildResponse("Saving has been successfully added.", savingDto, HttpStatus.CREATED);
    }

    @Transactional
    public ResponseEntity<ApiResponseDto<String>> updateSaving(Integer id, SavingDto savingDto) {
        User user = authService.getAuthenticatedUser();

        Optional<Saving> savingOptional = savingRepository.findById(id);
        if (savingOptional.isEmpty()) {
            return buildResponse("Saving not found.", null, HttpStatus.NOT_FOUND);
        }
        Saving saving = savingOptional.get();

        Optional<Goal> goalOptional = goalRepository
                .findByNameAndFinancialInfo(savingDto.getGoal(), user.getFinancialInfo());
        if (goalOptional.isEmpty()) {
            return buildResponse("Goal not found.", null, HttpStatus.NOT_FOUND);
        }
        Goal goal = goalOptional.get();

        BigDecimal difference = savingDto.getAmount().subtract(saving.getAmount());
        if (difference.compareTo(BigDecimal.ZERO) > 0 &&
                user.getFinancialInfo().getBudget().compareTo(difference) < 0) {
            return buildResponse("Insufficient funds for this operation.", null, HttpStatus.BAD_REQUEST);
        }

        updateSavingAndGoals(saving, savingDto, user, goal);
        return buildResponse("Saving has been successfully updated.", null, HttpStatus.OK);
    }

    @Transactional
    public ResponseEntity<ApiResponseDto<String>> deleteSaving(Integer id) {
        User user = authService.getAuthenticatedUser();

        Optional<Saving> savingOptional = savingRepository.findById(id);
        if (savingOptional.isEmpty()) {
            return buildResponse("Saving not found.", null, HttpStatus.NOT_FOUND);
        }
        Saving saving = savingOptional.get();

        financialInfoService.adjustUserBudget(user, saving.getAmount());
        Goal goal = saving.getGoal();
        goal.setCurrentAmount(goal.getCurrentAmount().subtract(saving.getAmount()));
        goalRepository.save(goal);
        savingRepository.deleteById(id);

        return buildResponse("Saving has been successfully deleted.", null, HttpStatus.OK);
    }

    private void updateSavingAndGoals(Saving saving, SavingDto savingDto, User user, Goal newGoal) {
        BigDecimal difference = savingDto.getAmount().subtract(saving.getAmount());
        if (difference.compareTo(BigDecimal.ZERO) != 0) {
            financialInfoService.adjustUserBudget(user, difference.negate());
        }
        Goal oldGoal = saving.getGoal();

        if (!oldGoal.getName().equals(newGoal.getName())) {
            oldGoal.setCurrentAmount(oldGoal.getCurrentAmount().subtract(saving.getAmount()));
            newGoal.setCurrentAmount(newGoal.getCurrentAmount().add(savingDto.getAmount()));
            saving.setGoal(newGoal);
            goalRepository.save(oldGoal);
            goalRepository.save(newGoal);
        } else if (difference.compareTo(BigDecimal.ZERO) != 0) {
            oldGoal.setCurrentAmount(oldGoal.getCurrentAmount().add(difference));
            goalRepository.save(oldGoal);
        }

        saving.setAmount(savingDto.getAmount());
        savingRepository.save(saving);
    }

    protected void adjustBudgetAndGoal(User user, Saving saving, Goal goal) {
        financialInfoService.adjustUserBudget(user, saving.getAmount().negate());
        goal.setCurrentAmount(goal.getCurrentAmount().add(saving.getAmount()));
        goalRepository.save(goal);
    }
}
