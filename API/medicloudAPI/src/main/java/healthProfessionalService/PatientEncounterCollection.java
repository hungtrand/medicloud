package healthProfessionalService;

import java.util.ArrayList;
import java.util.List;

import model.ActiveCondition;
import model.Person;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import model.Encounter;
import model.Patient;
import provider.MessageResponse;
import repository.*;
import org.jsondoc.core.annotation.*;

@RestController
@RequestMapping(value="/api/hp/{hpId}/patients/{patientId}/encounters")
@Api(name="Health professional Encounter Service", description="Health professional get the encounter hisotry with an individual patient.")
public class PatientEncounterCollection {
	@Autowired
	private PatientRepo patientRepo;

	@Autowired
	private PersonDao personRepo;
	
	
	@RequestMapping(value = "", method = RequestMethod.GET)
	@ApiMethod(description="health professional gets histories of encounter that encountered with an individual patient.")
	public ResponseEntity<?> getPatientEncounters(
			@ApiPathParam(name="health professional id", description="requires valid health professional")
			@PathVariable("hpId") int hpId,
			@ApiPathParam(name="patient id", description="requires patient id")@PathVariable("patientId") int patientId) {
		MessageResponse mr = new MessageResponse();
		mr.success = false;

		Patient patient = patientRepo.findByPatientId(patientId);

		if (patient == null) {
			return new ResponseEntity<MessageResponse>(mr, HttpStatus.NOT_FOUND);
		}
		int personId = patient.getPersonId();
		Person person = personRepo.findByPersonId(personId);
		List<Encounter> allEncounters = new ArrayList<Encounter>();
		if (person == null) {
			mr.error = "Profile not found";
			return new ResponseEntity<MessageResponse>(mr, HttpStatus.BAD_REQUEST);
		} else if (patientRepo.findByHpIdAndPersonId(hpId, personId).size() > 0) {
			List<Patient> personAsPatients = patientRepo.findByPersonId(personId);

			for(int i = 0; i < personAsPatients.size(); i++){
				List<Encounter> patientEncounters = personAsPatients.get(i).getEncounters();

				allEncounters.addAll(patientEncounters);
			}

		}
		return new ResponseEntity<List<Encounter>>(allEncounters, HttpStatus.OK);
	}
	
}
