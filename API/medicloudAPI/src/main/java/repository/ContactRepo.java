//package repository;
//
//import java.util.Collection;
//import java.util.List;
//
//import org.springframework.beans.factory.annotation.Qualifier;
//import org.springframework.stereotype.Repository;
//import org.springframework.data.repository.CrudRepository;
//import model.Contact;
//
//@Repository
//@Qualifier(value="ContactRepo")
//public interface ContactRepo extends CrudRepository<Contact, String>{
//
//	public Contact findByContactId(int contactId);
//	public Contact findByPersonId(int personId);
////	public Contact findByEmail(String email);
////	public List<Contact> findByPersonId(Collection<Integer> personId);
////	public Contact findByPhone(String phone);
//}
