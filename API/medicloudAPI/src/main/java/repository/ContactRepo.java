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
<<<<<<< HEAD
	public Contact findByPersonId(int personId);
	
//	public List<Contact> findByPersonId(Collection<Integer> personId);
//	public Contact findByPhone(String phone);
=======
	public Contact findByUser(User user);
>>>>>>> 6cc86bf898d374e3c75351459e6fd861e4d46dd9
}
