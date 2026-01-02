package atmSystem.example.ATM_System.dto;


import atmSystem.example.ATM_System.Enum.TransactionType;
import lombok.Data;

@Data
public class TransactionDto {
    private Long id;
    private Double amount;
    private TransactionType type;
}
