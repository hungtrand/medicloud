package healthProfessionalService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import model.Patient;
import model.ActiveCondition;
import repository.PatientRepo;

@RestController
@RequestMapping(value="/api/hp/{hpId}/patients/{patientId}/conditions")
public class PatientConditionCollection {
	@Autowired
	private PatientRepo patientRepo;
	
	@RequestMapping(value = "", method = RequestMethod.GET)
	public ResponseEntity<?> getPatientActiveConditions(@PathVariable("patientId") int patientId) {
		Patient patient = patientRepo.findByPatientId(patientId);
		
		List<ActiveCondition> listCond = patient.getConditions();
		return new ResponseEntity<List<ActiveCondition>>(listCond, HttpStatus.OK);
	}
}
