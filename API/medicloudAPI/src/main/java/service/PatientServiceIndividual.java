package service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import model.ActiveCondition;
import model.Condition;
import model.Observation;
import repository.PatientRepo;
import repository.PersonDao;
import repository.ActiveConditionRepo;
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
	private ActiveConditionRepo activeConditionRepo;
	
	@Autowired
	private ConditionRepo conditionRepo;
	
	/**
	 * Save new Condition of a patient.
	 * @param id - patient's id.
	 * @param newCondition - JSON object for new condition's data.
	 */
	@RequestMapping(value="/activeconditions", method=RequestMethod.POST)
	public void setNewActiveCondition(@PathVariable("patient_id")int id, @RequestBody ActiveCondition newCondition ){
		ActiveCondition addcondition = new ActiveCondition();
		newCondition.setPatientId(1);
		addcondition = activeConditionRepo.save(newCondition);
		
	}
	
	/**
	 * Update patient's condition.
	 * @param patientId - patient's id.
	 * @param conditionId - condition's id.
	 * @param updateCondition - JSON object for update/changes.
	 */
	@RequestMapping(value="/activeconditions/{active_condition_id}", method=RequestMethod.PUT)
	public void updateActiveCondition(@PathVariable("patient_id") int patientId, @PathVariable("condition_id") int conditionId, @RequestBody ActiveCondition updateCondition){
		ActiveCondition updateCondition1 = new ActiveCondition();
		updateCondition.setActiveConditionId(conditionId);
		updateCondition.setPatientId(patientId);
		updateCondition1 = activeConditionRepo.save(updateCondition);
	}
	
	@RequestMapping(value="/condition", method=RequestMethod.POST)
	public void setNewCondition(@PathVariable("patient_id")int patientId){
		Condition newCondition = new Condition();
		
	}
	
	@RequestMapping(value="/observations", method=RequestMethod.POST)
	public void setNewObservation(@PathVariable("patient_id")int patientId, @RequestBody Observation newObservation){
		Observation observation = new Observation();
		
	}
	
}
