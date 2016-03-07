package service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import repository.PatientRepo;


@RestController
@RequestMapping(value="/patient/{patient_id}")
public class PatientServiceModification {

	@Autowired
	PatientRepo patientRepo;
	
	public PatientServiceModification(){
		
	}
	
	@RequestMapping(value="", method=RequestMethod.PUT)
	public void updateObservation(){
		
	}
	
}
