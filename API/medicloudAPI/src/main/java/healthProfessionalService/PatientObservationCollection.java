package healthProfessionalService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import model.Encounter;
import model.HealthProfessional;
import model.Observation;
import model.Patient;
import provider.MessageResponse;
import repository.EncounterRepo;
import repository.HealthProfessional_repo;
import repository.ObservationRepo;
import repository.PatientRepo;

@RestController
@RequestMapping(value="/api/hp/{hpId}/patients/{patientId}/observations")
public class PatientObservationCollection {
	@Autowired
	private PatientRepo patientRepo;
	
	@Autowired
	private HealthProfessional_repo hpRepo;
	
	@Autowired
	private ObservationRepo obsRepo;
	
	@Autowired
	private EncounterRepo encounterRepo;
	
	@Transactional
	private Encounter saveEncounter(String encounterDate, String encounterReason, Patient pt, HealthProfessional hp) {
		Encounter newEncounter = Encounter.create(encounterDate, encounterReason, pt, hp);
				
		return encounterRepo.save(newEncounter);
	}
	
	@Transactional
	private Observation saveObservation(Encounter enco, HealthProfessional hp, Patient pt, String comments, String state) {
		Observation newObs = Observation.create(enco, hp, pt, comments, state);
		return obsRepo.save(newObs);
	}
	
	@RequestMapping(value = "", method = RequestMethod.GET)
	public ResponseEntity<?> getPatientObservations(@PathVariable("patientId") int patientId) {
		Patient patient = patientRepo.findByPatientId(patientId);
		
		List<Observation> listObs = patient.getObservations();
		return new ResponseEntity<List<Observation>>(listObs, HttpStatus.OK);
	}
	
	public static class newObservationForm {
		public String encounterDate;
		public String encounterReason;
		public String state;
		public String comments;
	}
	
	@RequestMapping(value = "", method = RequestMethod.POST)
	@Transactional
	public ResponseEntity<?> addObservation(
			@RequestBody newObservationForm newObsForm, 
			@PathVariable("hpId") int hpId,
			@PathVariable("patientId") int patientId) {
		MessageResponse mr = new MessageResponse();
		
		Patient patient = patientRepo.findByPatientId(patientId);
		HealthProfessional hp = hpRepo.findByHpId(hpId);
		
		if (patient == null) {
			mr.error = "Health Professional not found.";
			return new ResponseEntity<MessageResponse>(mr, HttpStatus.BAD_REQUEST);
		}
		
		if (hp == null) {
			mr.error = "Patient not found.";
			return new ResponseEntity<MessageResponse>(mr, HttpStatus.BAD_REQUEST);
		}
		
		Encounter encounter = saveEncounter(newObsForm.encounterDate, newObsForm.encounterReason, patient, hp);
		
		if (encounter == null) {
			mr.error = "Encounter is missing for this observation";
			return new ResponseEntity<MessageResponse>(mr, HttpStatus.BAD_REQUEST);
		}
		
		Observation newObs = saveObservation(encounter, hp, patient, newObsForm.comments, newObsForm.state);
		newObs = obsRepo.findByObsId(newObs.getObsId());

		return new ResponseEntity<Observation>(newObs, HttpStatus.OK);
	}
}
