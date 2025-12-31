package atmSystem.example.ATM_System.controller;

import atmSystem.example.ATM_System.dto.AccountDto;
import atmSystem.example.ATM_System.service.AccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/transaction")
@RequiredArgsConstructor
public class transactionController {

    private final AccountService accountService;

    @GetMapping("/{id}")
    public AccountDto getBalance(@PathVariable Long id){
        return accountService.getbalance(id);
    }
}
