package healthProfessionalService;

import java.util.ArrayList;
import java.util.List;

import model.Person;
import org.jsondoc.core.annotation.ApiMethod;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.jsondoc.core.annotation.Api;
import org.jsondoc.core.annotation.*;
import model.Patient;
import provider.MessageResponse;
import model.ActiveCondition;
import model.Condition;
import repository.*;

@RestController
@RequestMapping(value="/api/hp/{hpId}/patients/{patientId}/conditions")
@Api(name="Health professional conditions collection service", description="Health professional gets and creates new conditions for his/her patient. ")
public class PatientConditionCollection {
	@Autowired
	private PatientRepo patientRepo;
	
	@Autowired
	private ConditionRepo conditionRepo;
	
	@Autowired
	private ActiveConditionRepo activeConditionRepo;

	@Autowired
	private PersonDao personRepo;
	
	@Transactional
	private Condition saveCondition(Condition newCond) {

		return conditionRepo.save(newCond);
	}
	
	@RequestMapping(value = "", method = RequestMethod.GET)
	@ApiMethod(description="Health professional gets the active conditions of a patient.")
	public ResponseEntity<?> getPatientActiveConditions(
			@PathVariable("patientId") int patientId,
			@PathVariable("hpId") int hpId) {
		MessageResponse mr = new MessageResponse();
		mr.success = false;

		Patient patient = patientRepo.findByPatientId(patientId);

		if (patient == null) {
			return new ResponseEntity<MessageResponse>(mr, HttpStatus.NOT_FOUND);
		}
		int personId = patient.getPersonId();
		Person person = personRepo.findByPersonId(personId);
		List<ActiveCondition> allConditions = new ArrayList<ActiveCondition>();
		if (person == null) {
			mr.error = "Profile not found";
			return new ResponseEntity<MessageResponse>(mr, HttpStatus.BAD_REQUEST);
		} else if (patientRepo.findByHpIdAndPersonId(hpId, personId).size() > 0) {
			List<Patient> personAsPatients = patientRepo.findByPersonId(personId);

			for(int i = 0; i < personAsPatients.size(); i++){
				List<ActiveCondition> patientConditions = personAsPatients.get(i).getActiveConditions();

				allConditions.addAll(patientConditions);
			}

		}

		return new ResponseEntity<List<ActiveCondition>>(allConditions, HttpStatus.OK);
	}
	
	public static class newActiveCondition {
		public String name;
		public String severity;
		public String inferCId;
		public String description;
	}
	
	@RequestMapping(value = "", method = RequestMethod.POST)
	@Transactional
	@ApiMethod(description="transactional method.")
	public ResponseEntity<?> addActiveCondition(@RequestBody newActiveCondition newAC, @PathVariable("patientId") int patientId) {
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
		if (cond == null) {
			Condition newCond = Condition.create(newAC.name, newAC.inferCId);
			cond = this.saveCondition(newCond);
		}
		
		ActiveCondition ac = ActiveCondition.create(cond, patient);
		ac.setDescription(newAC.description);
		ac.setSeverity(newAC.severity);
		ac = activeConditionRepo.save(ac);
		
		return new ResponseEntity<ActiveCondition>(ac, HttpStatus.OK);
	}
}
