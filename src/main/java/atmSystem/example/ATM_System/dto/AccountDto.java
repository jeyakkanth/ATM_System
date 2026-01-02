package atmSystem.example.ATM_System.dto;


import lombok.Data;

@Data
public class AccountDto {
    private Long id;
    private String accountNumber;
    private Double balance;
}
