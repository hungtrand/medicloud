package healthProfessionalService;

import java.util.ArrayList;
import java.util.List;

import model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.jsondoc.core.annotation.*;
import provider.MessageResponse;
import repository.*;

@RestController
@RequestMapping(value="/api/hp/{hpId}/patients/{patientId}/observations")
@Api(name="Health professional observation  collections service ", description="Health professional views/gets or create new observations of an individual patient.")
public class PatientObservationCollection {
	@Autowired
	private PatientRepo patientRepo;
	
	@Autowired
	private HealthProfessional_repo hpRepo;
	
	@Autowired
	private ObservationRepo obsRepo;
	
	@Autowired
	private EncounterRepo encounterRepo;

	@Autowired
	private PersonDao personRepo;
	
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
	@ApiMethod(description="Health professional gets list of all observations of an individual patient.")
	public ResponseEntity<?> getPatientObservations(
			@ApiPathParam(name="health professional id", description="requires health professional")
			@PathVariable("hpId") int hpId,
			@ApiPathParam(name="patient id", description="requries patient id")
			@PathVariable("patientId") int patientId) {
		MessageResponse mr = new MessageResponse();
		mr.success = false;

		Patient patient = patientRepo.findByPatientId(patientId);

		if (patient == null) {
			return new ResponseEntity<MessageResponse>(mr, HttpStatus.NOT_FOUND);
		}
		int personId = patient.getPersonId();
		Person person = personRepo.findByPersonId(personId);
		List<Observation> allObservations = new ArrayList<Observation>();
		if (person == null) {
			mr.error = "Profile not found";
			return new ResponseEntity<MessageResponse>(mr, HttpStatus.BAD_REQUEST);
		} else if (patientRepo.findByHpIdAndPersonId(hpId, personId).size() > 0) {
			List<Patient> personAsPatients = patientRepo.findByPersonId(personId);

			for(int i = 0; i < personAsPatients.size(); i++){
				List<Observation> patientObservations = personAsPatients.get(i).getObservations();

				allObservations.addAll(patientObservations);
			}

		}
		return new ResponseEntity<List<Observation>>(allObservations, HttpStatus.OK);
	}
	
	public static class newObservationForm {
		public String encounterDate;
		public String encounterReason;
		public String state;
		public String comments;
	}
	
	@RequestMapping(value = "", method = RequestMethod.POST)
	@ApiMethod(description="Health professional creates new observation of an individual patient.")
	@Transactional
	public ResponseEntity<?> addObservation(
			@ApiBodyObject@RequestBody newObservationForm newObsForm, 
			@ApiPathParam(name="health professiona id", description="requires health professional id")@PathVariable("hpId") int hpId,
			@ApiPathParam(name="patient id", description="requires patient id")@PathVariable("patientId") int patientId) {
		MessageResponse mr = new MessageResponse();
		
		Patient patient = patientRepo.findByPatientId(patientId);
		HealthProfessional hp = hpRepo.findByHpId(hpId);
		
		if (patient == null) {
			mr.error = "Patient not found.";
			return new ResponseEntity<MessageResponse>(mr, HttpStatus.BAD_REQUEST);
		}
		
		if (hp == null) {
			mr.error = "Health Professional not found.";
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
