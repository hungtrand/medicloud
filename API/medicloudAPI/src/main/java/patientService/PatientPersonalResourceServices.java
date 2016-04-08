package patientService;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import model.Contact;
import model.Patient;
import model.Person;
import model.Appointment;
import provider.MessageResponse;
import repository.AppointmentRepo;
import repository.Contact_repo;
import repository.PatientRepo;

@RestController
@RequestMapping(value="/api/patients/{patient_id}")
public class PatientPersonalResourceServices {


		
		@Autowired
		private PatientRepo patientRepo;
		@Autowired
		private Contact_repo contactRepo;
		@Autowired
		private JavaMailSender mailer;
		
		@Autowired
		private AppointmentRepo appointmentRepo;
	
		
		/**
		 * Patient requests an Appointment.
		 * @param patientId
		 * @param hpId
		 * @param newAppointment
		 */
		@RequestMapping(value="/appointment", method=RequestMethod.POST)
		public void setAppointment(@PathVariable("patient_id")int patientId
				, @RequestBody Appointment newAppointment){
			
			Appointment temp = new Appointment();
//			List<Patient> patient = new ArrayList<Patient>();
				newAppointment.setRequestDate();
				newAppointment.setPatient(patientId);
				newAppointment.setHPId(1);
				temp = newAppointment;
				appointmentRepo.save(temp);
	
			

			
			
			
			
		}
		
		
		
	
	
}
