package ro.budgetmanager.scheduler;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import ro.budgetmanager.entity.Planner;
import ro.budgetmanager.entity.User;
import ro.budgetmanager.repository.PlannerRepository;
import ro.budgetmanager.repository.UserRepository;
import ro.budgetmanager.service.PlannerService;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class PlannerScheduler {

    private final PlannerService plannerService;
    private final PlannerRepository plannerRepository;
    private final UserRepository userRepository;


    public PlannerScheduler(PlannerService plannerService,
                            PlannerRepository plannerRepository,
                            UserRepository userRepository) {
        this.plannerService = plannerService;
        this.plannerRepository = plannerRepository;
        this.userRepository = userRepository;
    }

    @Scheduled(cron = "0 0 2 L * ?")
    public void allocateSurplusForAllUsers() {
        LocalDateTime oneMonthAgo = LocalDateTime.now().minusMonths(1);
        List<User> users = userRepository.findByLastAccessTimeAfter(oneMonthAgo);
        for (User user : users) {
            try {
                plannerService.allocateSurplusForUser(user);
            } catch (Exception e) {
                System.err.println("Failed to allocate surplus for user: " + user.getId());
            }
        }
    }

    @Scheduled(cron = "0 0 3 * * ?")
    public void processFixedTransactions() {
        LocalDateTime oneMonthAgo = LocalDateTime.now().minusMonths(1);
        List<Planner> planners = plannerRepository
                .findAllWithFixedTransactionsAndLastAccessTimeAfter(oneMonthAgo);
        for (Planner planner : planners) {
            try {
                plannerService.processFixedTransactionsForUser(planner);
            } catch (Exception e) {
                System.err.println("Failed to process fixed transactions for user: "
                        + planner.getFinancialInfo().getUser().getId());
            }
        }
    }
}
