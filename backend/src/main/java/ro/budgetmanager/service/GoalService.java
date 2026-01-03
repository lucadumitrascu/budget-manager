package ro.budgetmanager.service;

import jakarta.transaction.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import ro.budgetmanager.dto.ApiResponseDto;
import ro.budgetmanager.dto.GoalDto;
import ro.budgetmanager.entity.Goal;
import ro.budgetmanager.entity.Planner;
import ro.budgetmanager.entity.User;
import ro.budgetmanager.mapper.GoalMapper;
import ro.budgetmanager.repository.GoalRepository;
import ro.budgetmanager.repository.PlannerRepository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import static ro.budgetmanager.util.ApiUtils.buildResponse;

@Service
public class GoalService {

    private final GoalRepository goalRepository;
    private final GoalMapper goalMapper;
    private final PlannerRepository plannerRepository;
    private final FinancialInfoService financialInfoService;
    private final AuthService authService;

    public GoalService(GoalRepository goalRepository,
                       GoalMapper goalMapper,
                       PlannerRepository plannerRepository,
                       FinancialInfoService financialInfoService,
                       AuthService authService) {
        this.goalRepository = goalRepository;
        this.goalMapper = goalMapper;
        this.plannerRepository = plannerRepository;
        this.financialInfoService = financialInfoService;
        this.authService = authService;
    }

    public ResponseEntity<ApiResponseDto<List<GoalDto>>> getGoals() {
        User user = authService.getAuthenticatedUser();

        return buildResponse("Goals have been successfully retrieved.",
                goalMapper.toGoalDtos(user.getFinancialInfo().getGoals()), HttpStatus.OK);
    }

    public ResponseEntity<ApiResponseDto<GoalDto>> createGoal(GoalDto goalDto) {
        User user = authService.getAuthenticatedUser();

        if (isGoalDuplicate(user, goalDto.getName(), null)) {
            return buildResponse("Goal with this name already exists.", null, HttpStatus.BAD_REQUEST);
        }

        Goal goal = goalMapper.toGoal(goalDto, user.getFinancialInfo());
        goalRepository.save(goal);

        goalDto = goalMapper.toGoalDto(goal);
        return buildResponse("Goal has been successfully added.", goalDto, HttpStatus.CREATED);
    }

    public ResponseEntity<ApiResponseDto<String>> updateGoal(Integer id, GoalDto goalDto) {
        User user = authService.getAuthenticatedUser();
        Optional<Goal> goalOptional = goalRepository.findById(id);
        if (goalOptional.isEmpty()) {
            return buildResponse("Goal not found.", null, HttpStatus.NOT_FOUND);
        }
        Goal goal = goalOptional.get();

        if (isGoalDuplicate(user, goalDto.getName(), id)) {
            return buildResponse("Goal with this name already exists.", null, HttpStatus.BAD_REQUEST);
        }
        goal.setName(goalDto.getName());
        goal.setTargetAmount(goalDto.getTargetAmount());
        goalRepository.save(goal);
        return buildResponse("Goal has been successfully updated.", null, HttpStatus.OK);
    }

    @Transactional
    public ResponseEntity<ApiResponseDto<String>> deleteGoal(Integer id) {
        User user = authService.getAuthenticatedUser();

        Optional<Goal> goalOptional = goalRepository.findById(id);
        if (goalOptional.isEmpty()) {
            return buildResponse("Goal not found.", null, HttpStatus.NOT_FOUND);
        }

        Goal goal = goalOptional.get();
        financialInfoService.adjustUserBudget(user, goal.getCurrentAmount());
        Planner planner = user.getFinancialInfo().getPlanner();
        if (planner.getSelectedGoal() != null &&
                planner.getSelectedGoal().getId().equals(goal.getId())) {
            planner.setSelectedGoal(null);
            plannerRepository.save(planner);
        }
        goalRepository.deleteById(id);
        return buildResponse("Goal has been successfully deleted.", null, HttpStatus.OK);
    }

    @Transactional
    public ResponseEntity<ApiResponseDto<String>> withdrawFundsFromGoal(Integer id) {
        User user = authService.getAuthenticatedUser();

        Optional<Goal> goalOptional = goalRepository.findById(id);
        if (goalOptional.isEmpty()) {
            return buildResponse("Goal not found.", null, HttpStatus.NOT_FOUND);
        }

        Goal goal = goalOptional.get();
        if (goal.getCurrentAmount().compareTo(BigDecimal.ZERO) == 0) {
            return buildResponse("This goal has no funds to withdraw.", null, HttpStatus.BAD_REQUEST);
        }

        financialInfoService.adjustUserBudget(user, goal.getCurrentAmount());
        goal.setCurrentAmount(BigDecimal.ZERO);
        goal.getSavings().clear();
        goalRepository.save(goal);
        return buildResponse("Funds have been successfully withdrawn.", null, HttpStatus.OK);
    }

    private boolean isGoalDuplicate(User user, String name, Integer excludeId) {
        return user.getFinancialInfo().getGoals().stream()
                .filter(g -> excludeId == null || !excludeId.equals(g.getId()))
                .anyMatch(g -> g.getName().equalsIgnoreCase(name));
    }
}
