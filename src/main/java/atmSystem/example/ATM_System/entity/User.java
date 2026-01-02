package atmSystem.example.ATM_System.entity;

import atmSystem.example.ATM_System.utils.DateAudit;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class User extends DateAudit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true , nullable = false)
    private String username;

    private String email;

    private String password;

    @OneToOne(mappedBy = "user" , cascade = CascadeType.ALL)
    private Account account;

}
