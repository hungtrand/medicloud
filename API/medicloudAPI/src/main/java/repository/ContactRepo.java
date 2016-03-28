package repository;

import java.util.Collection;
import java.util.List;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;
import org.springframework.data.repository.CrudRepository;
import model.Contact;
import model.User;

@Repository
@Qualifier(value="ContactRepo")
public interface ContactRepo extends CrudRepository<Contact, String>{

	public Contact findByContactId(int contactId);
	public Contact findByUser(User user);
}
