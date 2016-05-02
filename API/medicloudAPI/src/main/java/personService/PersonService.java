package personService;

import java.util.ArrayList;
import java.util.List;
import org.jsondoc.core.annotation.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import model.Contact;
import model.User;
import model.Patient;
import model.Person;
import repository.PersonDao;
import repository.Contact_repo;
import repository.PatientRepo;
import repository.User_repo;

@RestController
@RequestMapping(value="/api/users/")
@Api(description="", name="Personal services for user")
public class PersonService {
	
	@Autowired
	private PatientRepo patientRepo;

	@Autowired
	private Contact_repo contactRepo;

	@Autowired
	private PersonDao personRepo;

	@Autowired
	private User_repo userRepo;

	/**
	 * 
	 * Create new Contact information for patients.
	 * 
	 * @return - new patient information.
	 * 
	 */
	//	@RequestMapping(value="/contact", method=RequestMethod.POST)
	//	public void setNewContactInformation(@PathVariable("user_id")int userId, 
	//			@RequestBody Contact newContact){
	//		
	//		Contact saveContact = new Contact();
	//		newContact.setPersonId(user);
	//		newContact.setPersonId(patientRepo.findByPatientId(patientId).getPersonId());
	//		newContact.setLatestUpdated();
	//		saveContact = contactRepo.save(newContact);
	//	}

	@RequestMapping(value="/{user_id}", method =RequestMethod.GET)
	public List<Contact> getUser(@PathVariable("user_id")int userId){
		List<Contact> temp = new ArrayList<Contact>();
		User findUser = userRepo.findByUserId(userId);

		temp = contactRepo.findByPerson(findUser.getPerson());
		return temp;

	}

	//----------------------- Post method-----------------------------
	/**
	 * Add new user Contact information.
	 * @param userId
	 * @param newContact
	 */
	@RequestMapping(value="/{user_id}/contact", method=RequestMethod.POST)
	public void setNewUserContact(@PathVariable("user_id")int userId, @RequestBody Contact newContact) {
		User u = userRepo.findByUserId(userId);

		newContact.setPerson(u.getPerson());
		newContact.setLatestUpdated();

		contactRepo.save(newContact);

	}

	//---------------------------- PUT method -------------------------
	@RequestMapping(value="/{user_id}/contacts/{contact_id}", method = RequestMethod.PUT)
	public void updateUserContact(@PathVariable("user_id")int userId, @PathVariable("contact_id")int contactId,
			@RequestBody Contact updateContact){
		
		Contact temp = contactRepo.findByContactId(contactId);
		
		if(temp != null){
			temp.setEmail(updateContact.getEmail());
			temp.setAddress(updateContact.getAddress());
			temp.setCity(updateContact.getCity());
			temp.setCountry(updateContact.getCountry());
			temp.setPhone(updateContact.getPhone());
			temp.setState(updateContact.getState());
			temp.setZip(updateContact.getZip());
			
			temp.setLatestUpdated();
			contactRepo.save(temp);
		}else {
			System.out.println("User does not exists.");
		}

	}

	// Adding 

}
