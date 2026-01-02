package atmSystem.example.ATM_System.entity;

import atmSystem.example.ATM_System.utils.DateAudit;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
public class Account extends DateAudit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String accountNumber;

    private Double balance;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "account" , cascade = CascadeType.ALL)
    private List<Transaction> transactions;

}
