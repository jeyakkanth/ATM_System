package atmSystem.example.ATM_System.service;

import atmSystem.example.ATM_System.dto.TransactionDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface TransactionService {
    TransactionDto depositAmount(Long id, TransactionDto transactionDto);

    TransactionDto withdrawalAmount(Long accountId, TransactionDto transactionDto);

    Page<TransactionDto> getAllTransactions(Pageable pageable);
}
