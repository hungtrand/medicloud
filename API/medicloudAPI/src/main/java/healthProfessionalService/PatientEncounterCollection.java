package healthProfessionalService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import model.Encounter;
import model.Patient;
import repository.EncounterRepo;
import repository.HealthProfessional_repo;
import repository.ObservationRepo;
import repository.PatientRepo;

@RestController
@RequestMapping(value="/api/hp/{hpId}/patients/{patientId}/encounters")
public class PatientEncounterCollection {
	@Autowired
	private PatientRepo patientRepo;
	
	@Autowired
	private HealthProfessional_repo hpRepo;
	
	@Autowired
	private ObservationRepo obsRepo;
	
	@Autowired
	private EncounterRepo encounterRepo;
	
	
	@RequestMapping(value = "", method = RequestMethod.GET)
	public ResponseEntity<?> getPatientEncounters(@PathVariable("patientId") int patientId) {
		Patient patient = patientRepo.findByPatientId(patientId).get(0);
		List<Encounter> listEncounters = patient.getEncounters();
		
		return new ResponseEntity<List<Encounter>>(listEncounters, HttpStatus.OK);
	}	
	
}
