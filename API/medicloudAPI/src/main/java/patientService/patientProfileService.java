package patientService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import model.Person;
import provider.MessageResponse;
import repository.PersonDao;

@RestController
@RequestMapping(value="/api/patient/{personId}")
public class patientProfileService {
	
	@Autowired
	private PersonDao personRepo;
	
	/**
	 * @method: GET
	 * @PathVariable:: patientId
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
	
	
}
