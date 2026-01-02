package atmSystem.example.ATM_System.service;

import atmSystem.example.ATM_System.Enum.TransactionType;
import atmSystem.example.ATM_System.dto.TransactionDto;
import atmSystem.example.ATM_System.entity.Account;
import atmSystem.example.ATM_System.entity.Transaction;
import atmSystem.example.ATM_System.repository.AccountRepository;
import atmSystem.example.ATM_System.repository.TransactionRepository;
import atmSystem.example.ATM_System.service.TransactionService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Transactional
public class TransactionServiceImpl implements TransactionService {

    private final AccountRepository accountRepository;
    private final TransactionRepository transactionRepository;

    @Override
    public TransactionDto depositAmount(Long accountId, TransactionDto dto) {

        if (dto.getAmount() <= 0) {
            throw new RuntimeException("Deposit amount must be greater than zero");
        }

        Account account = accountRepository.findById(accountId)
                .orElseThrow(() ->
                        new RuntimeException("Account not found with id: " + accountId));

        // Update balance
        account.setBalance(account.getBalance() + dto.getAmount());

        // Create transaction
        Transaction transaction = new Transaction();
        transaction.setAmount(dto.getAmount());
        transaction.setType(TransactionType.DEPOSIT);
        transaction.setAccount(account);

        // Save transaction
        Transaction savedTransaction = transactionRepository.save(transaction);

        // Save account
        accountRepository.save(account);

        // Return response
        TransactionDto response = new TransactionDto();
        response.setAmount(savedTransaction.getAmount());
        response.setType(savedTransaction.getType());
        response.setId(savedTransaction.getId());

        return response;
    }

    @Override
    public TransactionDto withdrawalAmount(Long accountId, TransactionDto transactionDto) {

        if(transactionDto.getAmount() <= 0){
            throw new RuntimeException("Deposit amount must be greater than zero");
        }

        Account account = accountRepository.findById(accountId)
                .orElseThrow(()-> new RuntimeException("Account not found with id: " + accountId));

        //update balance
        account.setBalance(account.getBalance() - transactionDto.getAmount());
        accountRepository.save(account);

        //set the withdrawal amount
        Transaction transaction = new Transaction();
        transaction.setType(TransactionType.WITHDRAW);
        transaction.setAmount(transactionDto.getAmount());
        transaction.setAccount(account);
        Transaction savedTransaction = transactionRepository.save(transaction);

        //return response for withdrawal
        TransactionDto response = new TransactionDto();
        response.setAmount(savedTransaction.getAmount());
        response.setType(savedTransaction.getType());
        response.setId(savedTransaction.getId());
        return response;
    }

    @Override
    public Page<TransactionDto> getAllTransactions(Pageable pageable) {
       Page<Transaction> transactions = transactionRepository.findAll(pageable);

       return transactions.map(transaction -> {
           TransactionDto transactionDto = new TransactionDto();
           transactionDto.setId(transaction.getId());
           transactionDto.setType(transaction.getType());
           transactionDto.setAmount(transaction.getAmount());
           return  transactionDto;
       });
    }
}
