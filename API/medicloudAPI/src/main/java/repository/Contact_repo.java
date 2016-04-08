package repository;

import java.util.List;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;
import org.springframework.data.repository.CrudRepository;
import model.Contact;
import model.Person;

@Repository
@Qualifier(value="ContactRepo")
public interface Contact_repo extends CrudRepository<Contact, String>{

	public Contact findByContactId(int contactId); 

	public List<Contact>findByPerson(Person person);

}
