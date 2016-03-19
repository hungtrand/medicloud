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
import model.Encounter;
import model.Note;
import model.Observation;
import model.Patient;
import model.Person;
import repository.ActiveConditionRepo;
import repository.CdoRepo;
import repository.ConditionRepo;
import repository.EncounterRepo;
import repository.NoteRepo;
import repository.ObservationRepo;
import repository.PatientRepo;
import repository.PersonDao;



@RestController
@RequestMapping(value="/api/hps/{hp_id}/patients")
public class PatientService {
	
		

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
	
	@Autowired
	private EncounterRepo encounterRepo;
	
	
	
	
	/**
	 * Get patient's all observations.
	 * @return
	 */
	@RequestMapping(value="/{patient_id}/observations/")
	public Observation getAllObservation(){
		return null;
	}

	
	
	@RequestMapping(value="/{patient_id}/observation/{observation_id}", method=RequestMethod.GET)
	public Observation getObservationById(@PathVariable("observation_id") int id){
		Observation tempObs = new Observation();	
		return obsRepo.findByObsId(id);
	}
	
	
	@RequestMapping(value="/api/patient/{id}", method=RequestMethod.GET)
	public Patient getAllPatient(@PathVariable("id")int id){
		
		return patientRepo.findByPatientId(id);
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
	@RequestMapping(value="/{patient_id}/activeconditions", method=RequestMethod.POST)
	public void setNewActiveCondition(@PathVariable("patient_id")int id, @RequestBody ActiveCondition newCondition){
		ActiveCondition addcondition = new ActiveCondition();
		int temp = 0;
//		while(temp < 2){
			Observation addObservation = new Observation();
			addObservation.setDateCreated();
			addObservation.setDateUpdated();
			addObservation = obsRepo.save(addObservation);
//			addObservation.getObsId();
//			temp++;
//			if(temp == 1){
//				newCondition.setStarObsId(addObservation.getObsId());
//			}else{
//				newCondition.setEndObsId(addObservation.getObsId());
//			}
//		}
		newCondition.setPatientId(id);
//		newCondition.setStarObsId(209);
//		newCondition.setEndObsId(211);
//		newCondition.setStarObsId(0);
//		newCondition.setEndObsId(0);
		addcondition = activeConditionRepo.save(newCondition);
		
	}
	
	
	/**
	 * Crate new patient in database.
	 * @param patientId
	 */
	@RequestMapping(value="/{patient_id}/condition", method=RequestMethod.POST)
	public void setNewCondition(@PathVariable("patient_id")int patientId){
		Condition newCondition = new Condition();	
	}
	
//	@RequestMapping(value="/condition/{condition_id}", method=RequestMethod.POST)
	
	/**
	 * 
	 * 
	 * @param patientId
	 * @param newObservation
	 */
	@RequestMapping(value="/{patient_id}/observations", method=RequestMethod.POST)
	public void setNewObservation(@PathVariable("patient_id")int patientId, @RequestBody Observation newObservation){
		
		Observation observation = new Observation();
		newObservation.setDateCreated();
		newObservation.setDateUpdated();
		observation = observationRepo.save(newObservation);
		
	}
	
	/**
	 * 
	 * 
	 * @param patientId
	 * @param obsId
	 * @param newNote
	 */
	@RequestMapping(value="/{patient_id}/observations/{obs_id}/notes", method=RequestMethod.POST)
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
	@RequestMapping(value="/{patient_id}/activeconditions/{active_condition_id}", method=RequestMethod.PUT)
	public void updateActiveCondition(@PathVariable("patient_id") int patientId, @PathVariable("active_condition_id") int conditionId, @RequestBody ActiveCondition updateCondition){
		ActiveCondition updateCondition1 = new ActiveCondition();
//		updateCondition.setActiveConditionId(conditionId);
		updateCondition1.setPatientId(patientId);
		updateCondition1 = activeConditionRepo.save(updateCondition);
	}
	
	//NOTE: this method might not need to use.
	/**
	 * Update patient's note.  
	 */
	@RequestMapping(value="/{patient_id}/activeconditions/{active_condition_id}/observations/{observation_id}/notes/{note_id}", method=RequestMethod.PUT)
	public void updateNote(@PathVariable("hp_id")int hpId, @PathVariable("patient_id")int patientId,
			@PathVariable("observation_id")int observationId, @PathVariable("note_id")int noteId, @RequestBody Note updatingNote){
		Note update = new Note();
		update.setNoteId(noteId);
		update = noteRepo.save(updatingNote);
	}
}
