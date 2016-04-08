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
import repository.ContactRepo;
import repository.HealthProfessional_repo;
import repository.PatientRepo;


@RestController
@RequestMapping(value="/api/patient/{patient_id}")
public class PatientPersonalResourceServices {


		
		@Autowired
		private PatientRepo patientRepo;
		@Autowired
		private ContactRepo contactRepo;
		@Autowired
		private JavaMailSender mailer;
		@Autowired
		private HealthProfessional_repo hpRepo;
		
		@Autowired
		private AppointmentRepo appointmentRepo;
		
	
		
		//--------------------------------------------------------------------GET------------------------------------------------------
		/**
		 * Get all appointments from a patient.
		 * @param patientId
		 * @return
		 */
		@RequestMapping(value="/appointments", method=RequestMethod.GET)
		public ResponseEntity<?> getAllAppointment(@PathVariable("patient_id")int patientId){
			List<Appointment> foundPatient = new ArrayList<Appointment>();
			
			foundPatient =  appointmentRepo.findByPatientId(patientId);
			
			if(foundPatient == null){
				MessageResponse mr = new MessageResponse();
				
				mr.success = false;
				mr.error = "Not Found: [patientId: " + patientId + " ]";
			
				System.out.println(mr.error);
				return new ResponseEntity<MessageResponse>(mr, HttpStatus.NOT_FOUND);
			}else{
				return  new ResponseEntity<List<Appointment>>(foundPatient, HttpStatus.OK);
			}
			
		}
		
		
		
		//--------------------------------------------------------------------POST-----------------------------------------------------
		
		/**
		 * Patient requests an Appointment.
		 * @param patientId
		 */
		@RequestMapping(value="/appointment", method=RequestMethod.POST)
		public ResponseEntity<?> setAppointment(@PathVariable("patient_id")int patientId		
				, @RequestBody Appointment newAppointment){
			
			Appointment temp = new Appointment();
			int hpId = newAppointment.getHPId();
			newAppointment.setRequestDate();
			newAppointment.setPatient(patientId);
			newAppointment.setPatientName(patientRepo.findByPatientId(patientId).getUser().getUsername());
			newAppointment.setHPName(hpRepo.findByHpId(hpId).getUser().getUsername());
			Patient foundPatient = patientRepo.findByHpIdAndPatientId(hpId, patientId);
			if(foundPatient == null){
				MessageResponse mr = new MessageResponse();
				mr.success = false;
				mr.error = "HealthProfessional and Patient are not connected.";
				System.out.println(mr.error);
				return new ResponseEntity<MessageResponse>(mr, HttpStatus.NOT_FOUND);			
			}else{			
				temp = newAppointment;			
				return new ResponseEntity<Appointment>(appointmentRepo.save(temp),HttpStatus.OK);
			}
				
		}
		
		
		
		//---------------------------------------------PUT-------------------------------------------------------
		
		/**
		 * Patient changes requested appointment.
		 * @param patientId
		 * @param appointmentId
		 */
		@RequestMapping(value="/appointment/{appointment_id}", method = RequestMethod.PUT)
		public ResponseEntity<?> updatePatientAppointment(@PathVariable("patient_id")int patientId
				,@PathVariable("appointment_id")int appointmentId
				,@RequestBody Appointment updateAppointment){
			Appointment temp = new Appointment();
			
			
			temp = appointmentRepo.findByPatientIdAndAppointmentId(patientId, appointmentId);
			if(temp==null){
				MessageResponse mr = new MessageResponse();
				mr.success = false;
				mr.error = "HealthProfessional and Patient are not connected.";
				System.out.println(mr.error);
				return new ResponseEntity<MessageResponse>(mr, HttpStatus.NOT_FOUND);
					
				}else{
				updateAppointment.setRequestDate();
				updateAppointment.setAppointmentId(appointmentId);
				updateAppointment.setPatient(patientId);
				int hpId = updateAppointment.getHPId();
				updateAppointment.setHPName(hpRepo.findByHpId(hpId).getUser().getUsername());
				appointmentRepo.save(updateAppointment);
				temp = updateAppointment;
				return new ResponseEntity<Appointment>(temp, HttpStatus.OK);
			
			}
			
		}
		
		
		
	
	
}
