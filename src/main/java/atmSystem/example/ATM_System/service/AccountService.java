package atmSystem.example.ATM_System.service;

import atmSystem.example.ATM_System.dto.AccountDto;

public interface AccountService {
    AccountDto getbalance(Long id);
}
