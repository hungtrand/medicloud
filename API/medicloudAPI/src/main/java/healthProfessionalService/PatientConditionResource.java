package healthProfessionalService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
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
@RequestMapping(value="/api/hp/{hpId}/patients/{patientId}/conditions")
public class PatientConditionResource {
	@Autowired
	private PatientRepo patientRepo;
	
	@Autowired
	private ConditionRepo conditionRepo;
	
	@Autowired
	private ActiveConditionRepo activeConditionRepo;
	
	public static class newActiveCondition {
		public String name;
		public String severity;
		public String inferCId;
		public String description;
	}
	
	@RequestMapping(value = "", method = RequestMethod.POST)
	public ResponseEntity<?> addActiveCondition(newActiveCondition newAC, @PathVariable("patientId") int patientId) {
		MessageResponse mr = new MessageResponse();
		
		Condition cond = conditionRepo.findByInferCId(newAC.inferCId);
		Patient patient = patientRepo.findByPatientId(patientId);
		
		if (newAC.name.length() == 0 || newAC.name == null) {
			mr.error = "Condition name is missing";
			return new ResponseEntity<MessageResponse>(mr, HttpStatus.BAD_REQUEST);
		}
		
		if (patient == null) {
			mr.error = "Patient not found.";
			return new ResponseEntity<MessageResponse>(mr, HttpStatus.BAD_REQUEST);
		}
		
		// first save the condition into the database if not already exist
		if (conditionRepo.findByInferCId(newAC.inferCId) == null) {
			Condition newCond = Condition.create(newAC.name, newAC.inferCId);

			newCond = conditionRepo.save(newCond);
		}
		
		ActiveCondition ac = ActiveCondition.create(cond, patient);
		ac.setDescription(newAC.description);
		ac.setSeverity(newAC.severity);
		ac = activeConditionRepo.save(ac);
		
		return new ResponseEntity<ActiveCondition>(ac, HttpStatus.OK);
	}
}
