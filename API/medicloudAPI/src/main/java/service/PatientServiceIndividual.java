package service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import model.Condition;
import repository.PatientRepo;
import repository.PersonDao;
import repository.ConditionRepo;
@RestController
@RequestMapping(value="/patient/{patient_id}")
public class PatientServiceIndividual {

	public PatientServiceIndividual(){
		
	};
	
	@Autowired
	private PersonDao pearsonDao;
	
	@Autowired
	private PatientRepo patientRepo;
	
	@Autowired
	private ConditionRepo conditionRepo;
	
	/**
	 * Save new Condition of a patient.
	 * @param id - patient's id.
	 * @param newCondition - JSON object for new condition's data.
	 */
	@RequestMapping(value="/conditions", method=RequestMethod.POST)
	public void setNewCondition(@PathVariable("patient_id")int id, @RequestBody Condition newCondition ){
		Condition addcondition = new Condition();
		newCondition.setPatientId(1);
		addcondition = conditionRepo.save(newCondition);
		
	}
	
	/**
	 * Update patient's condition.
	 * @param patientId - patient's id.
	 * @param conditionId - condition's id.
	 * @param updateCondition - JSON object for update/changes.
	 */
	@RequestMapping(value="/conditions/{condition_id}", method=RequestMethod.PUT)
	public void updateCondition(@PathVariable("patient_id") int patientId, @PathVariable("condition_id") int conditionId, @RequestBody Condition updateCondition){
		Condition updateCondition1 = new Condition();
		updateCondition.setConditionId(conditionId);
		updateCondition.setPatientId(patientId);
		updateCondition1 = conditionRepo.save(updateCondition);
	}
	
	
	
}
