package ro.budgetmanager.mapper;

import org.springframework.stereotype.Component;
import ro.budgetmanager.dto.SavingDto;
import ro.budgetmanager.entity.Goal;
import ro.budgetmanager.entity.Saving;

import java.util.List;

@Component
public class SavingMapper {

    public Saving toSaving(SavingDto savingDto, Goal goal) {
        Saving saving = new Saving();
        saving.setAmount(savingDto.getAmount());
        saving.setGoal(goal);
        return saving;
    }

    public SavingDto toSavingDto(Saving saving) {
        SavingDto savingDto = new SavingDto();
        savingDto.setId(saving.getId());
        savingDto.setAmount(saving.getAmount());
        savingDto.setCreatedAt(saving.getCreatedAt());
        savingDto.setGoal(saving.getGoal().getName());
        return savingDto;
    }

    public List<SavingDto> toSavingDtos(List<Saving> savings) {
        if (savings == null) return List.of();
        return savings.stream()
                .map(this::toSavingDto)
                .toList();
    }
}
