package atmSystem.example.ATM_System.service;

import atmSystem.example.ATM_System.dto.AccountDto;
import atmSystem.example.ATM_System.entity.Account;
import atmSystem.example.ATM_System.mappers.AccountMapper;
import atmSystem.example.ATM_System.repository.AccountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AccountServiceImpl implements AccountService{

    private final AccountRepository accountRepository;
    private final AccountMapper accountMapper;

    @Override
    public AccountDto getbalance(Long id) {
        Account balance = accountRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Account Number is missing with id : " + id));
        return accountMapper.toDto(balance);
    }
}
