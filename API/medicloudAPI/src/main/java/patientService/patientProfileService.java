package patientService;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import model.Contact;
import model.Person;
import provider.MessageResponse;
import repository.Contact_repo;
import repository.PersonDao;

@RestController
@RequestMapping(value="/api/patient/{personId}")
public class patientProfileService {
	
	@Autowired
	private PersonDao personRepo;
	
	@Autowired
	private Contact_repo contactRepo;
	
	@Transactional
	private boolean savePersonalInformation(Person p, Person newInfo) {
		p.setFirstName(newInfo.getFirstName());
		p.setLastName(newInfo.getLastName());
		p.setBirthdate(newInfo.getBirthdate());
		p.setGender(newInfo.getGender());
		
		Person saved = personRepo.save(p);
		
		if (saved != null)
			return true;
		else
			return false;
	}
	
	@Transactional
	private boolean saveContactInformation(Person p, List<Contact> listContacts) {
		for (Contact c : listContacts) {
			Contact existingContact = contactRepo.findByContactId(c.getContactId());
			
			if (existingContact == null) {
				existingContact = Contact.create(p);
			}
			existingContact.setAddress(c.getAddress());
			existingContact.setCity(c.getCity());
			existingContact.setState(c.getState());
			existingContact.setZip(c.getZip());
			existingContact.setEmail(c.getEmail());
			existingContact.setPhone(c.getPhone());
			
			contactRepo.save(existingContact);
		}
		
		return true;
	}
	
	/**
	 * @method: GET
	 * @PathVariable: personId
	 * @return ResponseEntity<Patient>
	 * 
	 */
	@RequestMapping(value="/profile", method=RequestMethod.GET)
	@ResponseBody
	public ResponseEntity<?> getPatientProfile(@PathVariable("personId") int personId) {
		MessageResponse mr = new MessageResponse();
		mr.success = false;
		
		Person person = personRepo.findByPersonId(personId);
		
		if (person == null) {
			mr.error = "Profile not found";
			return new ResponseEntity<MessageResponse>(mr, HttpStatus.NOT_FOUND);
		} else {
			return new ResponseEntity<Person>(person, HttpStatus.OK);
		}
		
	}
	
	/**
	 * @method: POST
	 * @PathVariable: personId
	 * @RequestBody: personProfile
	 * @return: savedProfile
	 */
	@RequestMapping(value="/profile", method=RequestMethod.POST)
	@ResponseBody
	@Transactional
	public ResponseEntity<?> postPatientProfile(@PathVariable("personId") int personId, @RequestBody Person newProfile) {
		MessageResponse mr = new MessageResponse();
		mr.success = false;
		
		Person person = personRepo.findByPersonId(personId);
		
		if (person == null) {
			mr.error = "Profile not found";
			return new ResponseEntity<MessageResponse>(mr, HttpStatus.NOT_FOUND);
		} else {
			savePersonalInformation(person, newProfile);
			saveContactInformation(person, newProfile.getContacts());
			
			return new ResponseEntity<Person>(personRepo.findByPersonId(personId), HttpStatus.OK);
		}
	}
}