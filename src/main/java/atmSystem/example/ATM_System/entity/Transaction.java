package atmSystem.example.ATM_System.entity;


import atmSystem.example.ATM_System.Enum.TransactionType;
import atmSystem.example.ATM_System.utils.DateAudit;
import jakarta.persistence.*;

@Entity
public class Transaction extends DateAudit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double amount;

    @Enumerated(EnumType.STRING)
    private TransactionType type;

    @ManyToOne
    @JoinColumn(name = "account_id")
    private Account account;
}
