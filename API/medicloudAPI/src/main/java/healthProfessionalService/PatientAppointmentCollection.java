package healthProfessionalService;

import org.jsondoc.core.annotation.Api;
import org.jsondoc.core.annotation.ApiMethod;
import org.jsondoc.core.annotation.ApiParams;
import org.jsondoc.core.annotation.ApiPathParam;
import org.jsondoc.core.annotation.ApiQueryParam;
import org.jsondoc.core.pojo.ApiStage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.stereotype.Controller;

import java.util.*;
import java.util.List;

import model.Appointment;
import provider.MessageResponse;
import repository.PatientRepo;
import repository.AppointmentRepo;

@RestController
@RequestMapping(value="/api/hp/{hpId}/patients")
@Api(description = "Provides collections of Appointments for Health Professional", name = "Health Professional Appointments API", stage=ApiStage.BETA)
public class PatientAppointmentCollection {

	@Autowired
	private AppointmentRepo appointmentRepo;
	
	@Autowired
	private PatientRepo patientRepo;
	
	
	//---------------------------------------------------GET-----------------------------------------

	/**
	 * Doctor's Availability on daily base.
	 * @param newAvailableTime
	 */
	@RequestMapping(value="/availability", method=RequestMethod.GET)
	public List<String> getDoctorAvailableTime( @PathVariable("hpId")int hpId, @RequestParam("userDate") String userDate
			){
		List<Appointment> appointment = new ArrayList<Appointment>();
		List<String> temp = new ArrayList<String>();
		Appointment start = new Appointment();
		appointment.add(start);
		temp = start.defaultAppointmentAvailability();

		appointment = appointmentRepo.findByAppointmentDate(userDate);
		
		if(appointment!= null){
				
				for(int i =0; i<appointment.size(); i++){
					temp.remove(appointment.get(i).getAppointmentTime());			
				}
	
			return temp;
		}else{
		
		return temp;
		}
	}
	
	
	/**
	 * Get all appointments from a patient.
	 * @param patientId
	 * @return
	 */
	@RequestMapping(value="/{patientId}/appointments", method=RequestMethod.GET)
	@ApiMethod(description="Get all Appointment of health professional that his or her individual patient")
	public ResponseEntity<?> getAllAppointment(@ApiPathParam(name="patientId") @PathVariable("patientId")int patientId
			, @ApiPathParam(name="hpId") @PathVariable("hpId")int hpId){
		List<Appointment> foundPatient = new ArrayList<Appointment>();
		List<Appointment> appointment = new ArrayList<Appointment>();	
		
		foundPatient =  appointmentRepo.findByPatientIdAndHpId(patientId, hpId);

		Appointment temp = new Appointment();
		
		if(foundPatient == null){
			MessageResponse mr = new MessageResponse();
			mr.success = false;
			mr.error = "Not Found: [patientId: " + patientId + " or hpId: " + hpId + "]";
		
			System.out.println(mr.error);
			
			return new ResponseEntity<MessageResponse>(mr, HttpStatus.NOT_FOUND);
		}else{
			
			
			for(int i=0; i<foundPatient.size(); i++){
					Scanner scanDate = new Scanner(foundPatient.get(i).getAppointmentDate());
					scanDate.useDelimiter("-");
					String date="";
					while(scanDate.hasNext()){
						date = date + scanDate.next();
					}
					int dateTime= Integer.parseInt(date);
					if((dateTime-temp.dateTimeChecker()) > 0){
						if(foundPatient.get(i).getActive() == true){
							appointment.add(foundPatient.get(i));
						}
					}						
			}
			
			return new ResponseEntity<List<Appointment>>(appointment,HttpStatus.OK);
		}	
	}
	
	
	/**
	 * Get the appointment by date
	 * @param hpId
	 * @param userDate
	 * @return
	 */
	@RequestMapping(value="/appointments", method=RequestMethod.GET)
	@ApiMethod(description="Get all the appointment of Health professional")
	public ResponseEntity<?> getIndividualPatientAppointment(@ApiPathParam(name="hpId")@PathVariable("hpId")int hpId
			, @ApiQueryParam(name="userDate")@RequestParam("userDate")String userDate){
		
		List<Appointment> foundAppointment = new ArrayList<Appointment>();
		List<Appointment> appointment = new ArrayList<Appointment>();
		
		foundAppointment = appointmentRepo.findByAppointmentDateAndHpIdAndActive(userDate, hpId, true);
		
		if(foundAppointment == null){
			MessageResponse mr = new MessageResponse();
			mr.success = false;
			mr.error = "Not Found: [hpId: " + hpId + "or Date: " + userDate + "]";
			mr.message="The hpId: " + hpId + " has no appointment on Date: " + userDate +".";
			return new ResponseEntity<MessageResponse>(mr, HttpStatus.NOT_FOUND);
		}else{
			
			
			for(int i=0; i< foundAppointment.size(); i++){
				if(foundAppointment.get(i).getAppointmentDate() != userDate){
					appointment.add(foundAppointment.get(i));
					
				}
		
			}
			return new ResponseEntity<List<Appointment>>(appointment, HttpStatus.OK);
		}	
		
	}
	
	
	
	
	
}
