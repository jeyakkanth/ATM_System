package atmSystem.example.ATM_System.service;

import atmSystem.example.ATM_System.dto.AccountDto;
import atmSystem.example.ATM_System.dto.UserDto;

public interface AccountService {
    AccountDto getBalance(Long id);

    UserDto getUser(String email);
}
