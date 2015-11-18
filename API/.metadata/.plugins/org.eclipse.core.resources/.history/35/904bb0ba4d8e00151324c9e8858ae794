package repositories;

import model.HPSignUp;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
@Qualifier(value = "HPSignUp_repo")
public interface HPSignUp_repo extends CrudRepository<HPSignUp, String> {
    public HPSignUp findByEmail(String email);
    public HPSignUp findByEmailAndVerificationKey(String email, String verificationKey);
}
