package atmSystem.example.ATM_System.mappers;

import atmSystem.example.ATM_System.dto.AccountDto;
import atmSystem.example.ATM_System.entity.Account;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface AccountMapper {

    AccountDto toDto(Account account);
    Account toEntity(AccountDto dto);
}
