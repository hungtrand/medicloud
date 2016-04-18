package healthProfessionalService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import model.ActiveCondition;
import model.Condition;
import model.Patient;
import provider.MessageResponse;
import repository.ActiveConditionRepo;
import repository.ConditionRepo;
import repository.PatientRepo;

@RestController
@RequestMapping(value="/api/hp/{hpId}/patients/{patientId}/conditions/{conditionId}")
public class PatientConditionResource {
	@Autowired
	private PatientRepo patientRepo;
	
	
}
