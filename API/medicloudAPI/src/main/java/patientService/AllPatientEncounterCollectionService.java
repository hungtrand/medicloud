package patientService;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import model.Encounter;
import model.Patient;
import model.Person;
import provider.MessageResponse;
import repository.PatientRepo;
import repository.PersonDao;
import org.jsondoc.core.annotation.*;
@RestController
@RequestMapping(value="/api/patient/{personId}")
@Api(name="Patient encounter services",description="Patient views all his/her encounters.")
public class AllPatientEncounterCollectionService {
	@Autowired
	private PersonDao personRepo;
	
	@Autowired
	private PatientRepo patientRepo;
	
	/**
	 * @method: GET
	 * @PathVariable: personId
	 * @return ResponseEntity<List<Encounter>
	 * 
	 */
	@RequestMapping(value="/encounters", method=RequestMethod.GET)
	@ResponseBody
	public ResponseEntity<?> getPatientEncounters(@PathVariable("personId") int personId) {
		MessageResponse mr = new MessageResponse();
		mr.success = false;
		
		Person person = personRepo.findByPersonId(personId);
		
		if (person == null) {
			mr.error = "Profile not found";
			return new ResponseEntity<MessageResponse>(mr, HttpStatus.NOT_FOUND);
		} else {
			List<Patient> personAsPatients = patientRepo.findByPersonId(personId);
			List<Encounter> allEncounters = new ArrayList<Encounter>();
			
			for(int i = 0; i < personAsPatients.size(); i++){
				List<Encounter> patientEncounters = personAsPatients.get(i).getEncounters();
				
				allEncounters.addAll(patientEncounters);
			}
			
			return new ResponseEntity<List<Encounter>>(allEncounters, HttpStatus.OK);
		}
		
	}
}
