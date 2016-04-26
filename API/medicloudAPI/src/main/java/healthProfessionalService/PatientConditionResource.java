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
import repository.ObservationRepo;
import repository.PatientRepo;

@RestController
@RequestMapping(value="/api/hp/{hpId}/patients/{patientId}/conditions/{activeConditionId}")
public class PatientConditionResource {
	@Autowired
	private PatientRepo patientRepo;
	
	@Autowired
	private ActiveConditionRepo activeConditionRepo;
	
	@Autowired
	private ObservationRepo observationRepo;
	
	private static class tempActiveCondition {
		public int activeConditionId;
		public Integer startObsId;
		public Integer endObsId;
	}
	
	@RequestMapping(value = "", method = RequestMethod.PUT)
	public ResponseEntity<?> updateActiveCondition(@PathVariable("activeConditionId") int conditionToBeSaved, @RequestBody tempActiveCondition dataToBeSaved) {
		MessageResponse mr = new MessageResponse();
		ActiveCondition targetActCond = activeConditionRepo.findByActiveConditionId(conditionToBeSaved);
		if (targetActCond == null) {
			mr.error = "The condition to be saved does not exist.";
			return new ResponseEntity<MessageResponse>(mr, HttpStatus.BAD_REQUEST);
		} else if (conditionToBeSaved != dataToBeSaved.activeConditionId) {
			mr.error = "Illegal request. The data to be saved does not match the target resource";
			return new ResponseEntity<MessageResponse>(mr, HttpStatus.BAD_REQUEST);
		}
		
		if (observationRepo.findByObsId(dataToBeSaved.startObsId) != null) {
			targetActCond.setStartObsId(dataToBeSaved.startObsId);
		}
		
		if (observationRepo.findByObsId(dataToBeSaved.endObsId) != null) {
			targetActCond.setEndObsId(dataToBeSaved.endObsId);
		}
		
		return new ResponseEntity<ActiveCondition>(activeConditionRepo.save(targetActCond), HttpStatus.OK);
	}
}
