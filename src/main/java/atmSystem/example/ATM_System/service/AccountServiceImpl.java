package atmSystem.example.ATM_System.service;


import atmSystem.example.ATM_System.dto.AccountDto;
import atmSystem.example.ATM_System.dto.UserDto;
import atmSystem.example.ATM_System.entity.Account;
import atmSystem.example.ATM_System.entity.User;
import atmSystem.example.ATM_System.repository.AccountRepository;
import atmSystem.example.ATM_System.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AccountServiceImpl implements AccountService{

    private final AccountRepository accountRepository;

    private final UserRepository userRepository;

    @Override
    public AccountDto getBalance(Long id) {
        Account account = accountRepository.findById(id)
                .orElseThrow(()-> new RuntimeException("Not Found Any Details with id : " + id));

        AccountDto accountDto = new AccountDto();
        accountDto.setId(account.getId());
        accountDto.setAccountNumber(account.getAccountNumber());
        accountDto.setBalance(account.getBalance());
        return accountDto;
    }

    @Override
    public UserDto getUser(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(()-> new RuntimeException("Not Fount Any User with email : " + email));

        UserDto userDto = new UserDto();
        userDto.setId(user.getId());
        return userDto;
    }
}
