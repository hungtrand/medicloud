package repository;

import java.util.Collection;
import java.util.List;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import model.Contact;
import model.User;

@Repository
@Qualifier(value="ContactRepo")
public interface ContactRepo extends CrudRepository<Contact, String>{

	public Contact findByContactId(int contactId); 

	public Contact findByPersonId(int personId);
	public Contact findByPersonIdAndUserId(int personId, int userId);
	public Contact findByUser(User user);
	public Contact findByContactIdAndUserIdAndPersonId(int contactId, int userId, int personId);

	public List<Contact>findByUserId(int userId);

}
