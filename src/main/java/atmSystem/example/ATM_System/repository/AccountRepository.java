package atmSystem.example.ATM_System.repository;

import atmSystem.example.ATM_System.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountRepository extends JpaRepository<Account , Long> {
}
