package healthProfessionalService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import model.Patient;
import provider.MessageResponse;
import repository.PatientRepo;

@RestController
@RequestMapping(value="/api/hp/{hpId}/patients/{patientId}")
public class PatientResource {
	
	@Autowired
	PatientRepo patientRepo;
	
	@RequestMapping(value="/", method = RequestMethod.GET)
	public ResponseEntity<?> getPatient(@PathVariable("patientId") int patientId ) {
		Patient foundPatient =  patientRepo.findByPatientId(patientId);
		
		if (foundPatient == null) {
			MessageResponse mr = new MessageResponse();
			mr.success = false;
			mr.error ="Not Found";
			
			return new ResponseEntity<MessageResponse>(mr, HttpStatus.BAD_REQUEST);
		} else {
			return new ResponseEntity<Patient>(foundPatient, HttpStatus.OK);
		}
	}
}
