package service;

import java.awt.PageAttributes.MediaType;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import model.ActiveCondition;
import model.Cdo;
import model.Condition;
import model.Note;
import model.Observation;
import model.Patient;
import model.Person;
import repository.ActiveConditionRepo;
import repository.CdoRepo;
import repository.ConditionRepo;
import repository.NoteRepo;
import repository.ObservationRepo;
import repository.PatientRepo;
import repository.PersonDao;



@RestController
@RequestMapping(value="api/patient/{id}")
public class PatientService {
	
	@Autowired
	private CdoRepo cdoRepo;	

	@Autowired
	private ObservationRepo obsRepo;
	
	@Autowired
	private PersonDao personDao;
	
	@Autowired
	private PatientRepo patientRepo;
	
	@Autowired
	private ActiveConditionRepo activeConditionRepo;
	
	@Autowired
	private ConditionRepo conditionRepo;
	
	@Autowired
	private ObservationRepo observationRepo;
	
	@Autowired
	private NoteRepo noteRepo;
	
	/**
	 * Getting resource.
	 * Get individual's CDO information. 
	 * 
	 * @param id - CDO Id 
	 * @return
	 */
	@RequestMapping(value="/api/cdo/{id}", method = RequestMethod.GET)
	public @ResponseBody Cdo getCdoById(@PathVariable("id") int id){
		
		Cdo p = cdoRepo.findByCdoId(id);
		
		return p;
		
	}
	
	/**
	 * 
	 * @return
	 */
	@RequestMapping(value="/api/cdos", method =RequestMethod.GET)
	public Iterable<Cdo> getAllCDO(){
		return cdoRepo.findAll();
	}
	
	@RequestMapping(value="/api/")
	public Observation getAllObservation(){
		return null;
	}

	
	
	@RequestMapping(value="/api/observation/{id}", method=RequestMethod.GET)
	public Observation getObservationById(@PathVariable("id") int id){
		Observation tempObs = new Observation();
		
		return obsRepo.findByObsId(id);
	}
	
	
	@RequestMapping(value="/api/patient/{id}", method=RequestMethod.GET)
	public Patient getAllPatient(@PathVariable("id")int id){
		
		return patientRepo.findByPatientId(id);
	}
	
	
	class helloworld{
	
			public Person tempPerson = new Person();
			public Observation temObs = new Observation();
			public void setPerson(Person p){
				this.tempPerson = p;
			}
			public void setObs(Observation o){
				this.temObs = o;
			}
		
	}
	@RequestMapping(value="/api/getinfo/{id}", method=RequestMethod.GET)
	public helloworld getTesting(@PathVariable("id")int id){
		helloworld hw = new helloworld();
		hw.setPerson(personDao.findByPersonId(id));
		hw.setObs(obsRepo.findByObsId(id));
		return hw;
	}
	
	
	
//	@RequestMapping(value="/api/{id}/obs",method=RequestMethod.POST)
//	public void setObservation(@PathVariable("id")int id,@RequestBody Observation newObservation){
//		Observation ob = new Observation();
//		
////		newObservation.setPersonId(id);
//		ob=obsRepo.save(newObservation);
//		
//		
//	}
//	
	
	
	
//	@RequestMapping(value="/api/cdo", method=RequestMethod.POST)
//	public void setCdo(@RequestBody Cdo c){	
//		cdoRepo.save(c);
//	}
//	
	
	//-----------------------------------------------------------------------------------------------POST------------------------------------------------------------------------------------------
	
	/**
	 * Save new Active Condition of a patient.
	 * @param id - patient's id.
	 * @param newCondition - JSON object for new condition's data.
	 */
	@RequestMapping(value="/activeconditions", method=RequestMethod.POST)
	public void setNewActiveCondition(@PathVariable("patient_id")int id, @RequestBody Condition newCondition ){
		if (!conditionRepo.existsByInferCId(newCondition.getInferCId()) && !conditionRepo.existsByName(newCondition.getName())) {
			newCondition = conditionRepo.save(newCondition);
		} else if (newCondition.getConditionId() > 0) {
			newCondition = conditionRepo.findByConditionId(newCondition.getConditionId());
		} else {
			newCondition = conditionRepo.findByName(newCondition.getName());
		}
		
		ActiveCondition addcondition = new ActiveCondition();
		addcondition.setPatientId(id);
		addcondition.setConditionId(newCondition.getConditionId());
		addcondition = activeConditionRepo.save(addcondition);
		
	}
	
	
	/**
	 * 
	 * @param patientId
	 */
	@RequestMapping(value="/condition", method=RequestMethod.POST)
	public void setNewCondition(@PathVariable("patient_id")int patientId){
		Condition newCondition = new Condition();	
	}
	
//	@RequestMapping(value="/condition/{condition_id}", method=RequestMethod.POST)
	
	/**
	 * 
	 * @param patientId
	 * @param newObservation
	 */
	@RequestMapping(value="/observations", method=RequestMethod.POST)
	public void setNewObservation(@PathVariable("patient_id")int patientId, @RequestBody Observation newObservation){
		
		Observation observation = new Observation();
		newObservation.setDateCreated();
		newObservation.setDateUpdated();
		observation = observationRepo.save(newObservation);
		
	}
	
	/**
	 * 
	 * @param patientId
	 * @param obsId
	 * @param newNote
	 */
	@RequestMapping(value="/observations/{obs_id}/notes", method=RequestMethod.POST)
	public void setNewNote(@PathVariable("patient_id")int patientId, @PathVariable("obs_id") int obsId, 
			@RequestBody Note newNote){
		
		Note note = new Note();
		newNote.setDateCreated();
		newNote.setObsId(obsId);
		note = noteRepo.save(newNote);
		
	}
	
	//----------------------------------------------------------------------------------PUT------------------------------------------------------------------------------------------------------
	
	/**
	 * Update patient's condition.
	 * @param patientId - patient's id.
	 * @param conditionId - condition's id.
	 * @param updateCondition - JSON object for update/changes.
	 */
	@RequestMapping(value="/activeconditions/{active_condition_id}", method=RequestMethod.PUT)
	public void updateActiveCondition(@PathVariable("patient_id") int patientId, @PathVariable("condition_id") int conditionId, @RequestBody ActiveCondition updateCondition){
		ActiveCondition updateCondition1 = new ActiveCondition();
		updateCondition.setConditionId(conditionId);
		updateCondition.setPatientId(patientId);
		updateCondition1 = activeConditionRepo.save(updateCondition);
	}
	
}
