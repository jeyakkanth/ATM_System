package atmSystem.example.ATM_System.controller;

import atmSystem.example.ATM_System.dto.AccountDto;
import atmSystem.example.ATM_System.dto.TransactionDto;
import atmSystem.example.ATM_System.dto.UserDto;
import atmSystem.example.ATM_System.service.AccountService;
import atmSystem.example.ATM_System.service.TransactionService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/transaction")
@RequiredArgsConstructor
public class transactionController {

    private final AccountService accountService;

    private final TransactionService transactionService;

    //Get Balance
    @GetMapping("/balance/{id}")
    public AccountDto getBalance(@PathVariable Long id){
        return accountService.getBalance(id);
    }

    //get user id using email
    @GetMapping("/user")
    public UserDto getUser(@RequestParam String email){
        return accountService.getUser(email);
    }

    //Deposit
    @PostMapping("/deposit/{account_id}")
    public TransactionDto depositAmount(@PathVariable Long account_id , @RequestBody TransactionDto transactionDto){

        return transactionService.depositAmount(account_id , transactionDto);
    }

    //Withdrawal
    @PostMapping("/withdrawal/{account_id}")
    public TransactionDto withdrawalAmount(@PathVariable Long account_id , @RequestBody TransactionDto transactionDto){
        return transactionService.withdrawalAmount(account_id , transactionDto);
    }

    //Get all Transaction History
    @GetMapping("/history")
    public Page<TransactionDto> getAllTransactionHistory(
            @RequestParam int pageNo ,
            @RequestParam int pageSize
    ){
        if(pageNo < 0 || pageSize < 0){
            throw new RuntimeException("page no or page size is less then zero..!");
        }

        Pageable pageable = PageRequest.of(pageNo-1 , pageSize);

        return transactionService.getAllTransactions(pageable);
    }
}
