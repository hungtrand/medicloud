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
import org.jsondoc.core.annotation.*;

@RestController
@RequestMapping(value="/api/hp/{hpId}/patients/{patientId}/encounters")
@Api(name="Health professional Encounter Service", description="Health professional get the encounter hisotry with an individual patient.")
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
	@ApiMethod(description="health professional gets histories of encounter that encountered with an individual patient.")
	public ResponseEntity<?> getPatientEncounters(
			@ApiPathParam(name="patient id", description="requires patient id")@PathVariable("patientId") int patientId) {
		Patient patient = patientRepo.findByPatientId(patientId);
		List<Encounter> listEncounters = patient.getEncounters();
		
		return new ResponseEntity<List<Encounter>>(listEncounters, HttpStatus.OK);
	}	
	
}
