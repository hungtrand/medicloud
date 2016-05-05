package patientService;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.jsondoc.core.annotation.*;
import model.HealthProfessional;
import model.Patient;
import provider.MessageResponse;
import repository.HealthProfessional_repo;
import repository.PatientRepo;

@RestController
@RequestMapping(value="/api/patient/{personId}")
@Api(name="Patient Health Services", description="Patient views all his/her health professional's information.")
public class PatientHealthProfessionalCollection {
	@Autowired
	private PatientRepo patientRepo;
	
	@Autowired
	private HealthProfessional_repo hpRepo;
	
	/**
	 * Get all Health professional of a person
	 * @param personId
	 * @return list of health professionals
	 */
	@RequestMapping(value="/health-professionals", method=RequestMethod.GET)
	@ApiMethod(description="Patient views health professional.")
	public ResponseEntity<?> getAllHpOfaPerson(@ApiPathParam(name="person id", description="requires person id.")@PathVariable("personId")int personId){
		List<Patient> foundPatient = patientRepo.findByPersonId(personId);
		
		if(foundPatient==null){
			MessageResponse mr = new MessageResponse();
			mr.success = false;
			mr.error= "Person Not Found";
			mr.message = "";
			return new ResponseEntity<MessageResponse>(mr, HttpStatus.NOT_FOUND);
		} else {
			List<HealthProfessional> hps = new ArrayList<HealthProfessional>();
			for(int i = 0; i < foundPatient.size(); i++){
				HealthProfessional foundHp = hpRepo.findByHpId(foundPatient.get(i).getHpId());
				hps.add(foundHp);
			}
			
			return new ResponseEntity<List<HealthProfessional>>(hps, HttpStatus.OK);
		}
	
	}
}
