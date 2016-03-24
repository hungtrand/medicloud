package healthProfessionalService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ser.FilterProvider;
import com.fasterxml.jackson.databind.ser.impl.SimpleBeanPropertyFilter;
import com.fasterxml.jackson.databind.ser.impl.SimpleFilterProvider;

import model.Patient;
import provider.MessageResponse;
import repository.PatientRepo;

@RestController
@RequestMapping(value="/api/hp/{hpId}/patients/{patientId}")
public class PatientResource {
	
	@Autowired
	PatientRepo patientRepo;
	
	@RequestMapping(value="", method = RequestMethod.GET)
	public ResponseEntity<?> getPatient(
			@PathVariable("hpId") int hpId
			, @PathVariable("patientId") int patientId 
		) 
	{
		Patient foundPatient =  patientRepo.findByHpIdAndPatientId(hpId, patientId);
		
		if (foundPatient == null) {
			MessageResponse mr = new MessageResponse();
			mr.success = false;
			mr.error ="Not Found: [hpId: " +  hpId + "], [patientId: " + patientId + "]";
			System.out.println(mr.error);
			return new ResponseEntity<MessageResponse>(mr, HttpStatus.NOT_FOUND);
		} else {
			return new ResponseEntity<Patient>(foundPatient, HttpStatus.OK);
		}
	}
}
