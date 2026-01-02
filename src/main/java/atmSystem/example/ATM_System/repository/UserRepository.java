package atmSystem.example.ATM_System.repository;

import atmSystem.example.ATM_System.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User , Long> {
    Optional<User> findByEmail(String email);

}
