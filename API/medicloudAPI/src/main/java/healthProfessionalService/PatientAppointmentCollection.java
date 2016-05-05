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
import model.Patient;
import model.Person;
import provider.MessageResponse;
import repository.PatientRepo;
import repository.AppointmentRepo;
import repository.PersonDao;

import java.security.SecureRandom;


@RestController
@RequestMapping(value="/api/hp/{hpId}/patients")
@Api(description = "Provides collections of Appointments for Health Professional", name = "Health Professional finds Appointments API", stage=ApiStage.BETA)
public class PatientAppointmentCollection {

	@Autowired
	private AppointmentRepo appointmentRepo;
	
	@Autowired
	private PatientRepo patientRepo;
	
	@Autowired
	private PersonDao personDao;
	
	
	//---------------------------------------------------GET-----------------------------------------

	/**
	 * Doctor's Availability on daily base.
	 * @param newAvailableTime
	 */
	public class listOfAppointments {
		public String time;
		public String firstName;
		public String lastName;
		
		listOfAppointments(String time, String firstName, String lastName) {
			this.time = time;
			this.firstName = firstName;
			this.lastName = lastName;
		}
	}

	/**
	 * Get all the available time based on specified date.
	 * @param hpId - Health professional id
	 * @param userDate - date that user wants to make appointment.
	 * @return - list of available time for specified date.
	 */
	@RequestMapping(value="/availability", method=RequestMethod.GET)
	@ApiMethod(description="Get all available time of a health professional.")
	public List<String> getDoctorAvailableTime(@ApiPathParam(name="hpId") @PathVariable("hpId")int hpId
			, @ApiQueryParam(name="userDate", description="find By date")@RequestParam("userDate") String userDate
			){
		List<Appointment> appointment = new ArrayList<Appointment>();
		List<String> temp = new ArrayList<String>();
		Appointment start = new Appointment();
		appointment.add(start);
		temp = start.defaultAppointmentAvailability();

		appointment = appointmentRepo.findByAppointmentDate(userDate);
		
		//check if specified date has appointment if yes then remove those appointment time else shows all appointments.
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
	 * Get all appointments with appointment time and patient name
	 * @param hpId, userDate 
	 * @return - list of all the appointment with patient names that a health professional has with.
	 */
	
	@RequestMapping(value="/getListOfAppointments", method=RequestMethod.GET)
	@ApiMethod(description="Health professional views list of his/her appointment on specified date.")
	public List<listOfAppointments>getListOfAppointments(
			@ApiPathParam(name="health professional id")@PathVariable("hpId")int hpId, 
			@ApiQueryParam(description="Date that user wants to view")@RequestParam("userDate")String userDate) {
		List<Appointment> appointments = new ArrayList<Appointment>();
		List<listOfAppointments>appointmentDetails = new ArrayList<listOfAppointments>();
		int patientId = 0;
		Patient patient = new Patient();
		Person person = new Person();
		appointments = appointmentRepo.findByHpIdAndAppointmentDate(hpId, userDate);
		for (int i = 0; i < appointments.size(); i++) {
			patientId = appointments.get(i).getPatientId();
			String time = appointments.get(i).getAppointmentTime();
			patient = patientRepo.findByPatientId(patientId);
			person = personDao.findByPersonId(patient.getPersonId());
			String firstName = person.getFirstName();
			String lastName = person.getLastName();
			appointmentDetails.add(i, new listOfAppointments(time, firstName, lastName));
		}
		return appointmentDetails;
	}
	
	
	/**
	 * Get all appointments from a patient.
	 * @param patientId - patient id
	 * @return - health professional gets a list of all appointment with a specified patient.
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
			
			//check if the appointment date has been expired.
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
	 * @param hpId - health professional id
	 * @param userDate - user specified date.
	 * @return - list of all the appointments that a user has on specified date.
	 */
	@RequestMapping(value="/appointments", method=RequestMethod.GET)
	@ApiMethod(description="Get all the appointment of Health professional")
	public ResponseEntity<?> getIndividualPatientAppointment(@ApiPathParam(name="hpId", description="Health Professional ID")@PathVariable("hpId")int hpId
			, @ApiQueryParam(name="userDate", description="find by date")@RequestParam("userDate")String userDate){
		
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
