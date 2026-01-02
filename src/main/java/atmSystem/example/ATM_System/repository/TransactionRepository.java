package atmSystem.example.ATM_System.repository;

import atmSystem.example.ATM_System.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransactionRepository extends JpaRepository<Transaction , Long> {
}
