package healthProfessionalService;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

import model.Appointment;
import repository.PatientRepo;
import repository.AppointmentRepo;

@RestController
@RequestMapping(value="/api/hp/{hpId}/patients")
public class PatientAppointmentCollection {

	@Autowired
	private AppointmentRepo appointmentRepo;
	
	@Autowired
	private PatientRepo patientRepo;
	
	
	//---------------------------------------------------GET-----------------------------------------
	/**
	 * 
	 * @return
	 */
	@RequestMapping(value="/appointments",method=RequestMethod.GET)
	public ResponseEntity<?> getADoctorAppointments(@PathVariable("hpId")int hpId,
			@RequestParam("hpDate")String hpDate){
		
		List<Appointment> appointment = new ArrayList<Appointment>();
		Appointment start = new Appointment();
	
		
		appointment = appointmentRepo.findByAppointmentDate(hpDate);
		
		return null;
	}
	
}
