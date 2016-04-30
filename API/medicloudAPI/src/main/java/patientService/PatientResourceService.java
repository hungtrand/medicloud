package patientService;

import static org.springframework.web.bind.annotation.RequestMethod.POST;
import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.PUT;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Scanner;

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
import model.Prescription;
import model.User;
import model.Appointment;
import provider.MessageResponse;
import repository.AppointmentRepo;

import repository.Contact_repo;
import repository.HealthProfessional_repo;
import repository.PatientRepo;
import repository.PrescriptionRepo;
import repository.User_repo;


@RestController
@RequestMapping(value="/api/patient")
public class PatientResourceService {


		
		@Autowired
		private PatientRepo patientRepo;
		@Autowired
		private Contact_repo contactRepo;
		@Autowired
		private JavaMailSender mailer;
		@Autowired
		private HealthProfessional_repo hpRepo;
		@Autowired
		private PrescriptionRepo prescriptionRepo;
		
		@Autowired
		private User_repo userRepo;
	
		
		@Autowired
		private AppointmentRepo appointmentRepo;
		
	
		
		//--------------------------------------------------------------------GET------------------------------------------------------
		/**
		 * Get all appointments from a patient.
		 * @param patientId
		 * @return
		 */
		@RequestMapping(value="/{patient_id}/appointments", method=RequestMethod.GET)
		public ResponseEntity<?> getAllAppointment(@PathVariable("patient_id")int patientId){
			List<Appointment> foundPatient = new ArrayList<Appointment>();
			List<Appointment> appointment = new ArrayList<Appointment>();	
			
			foundPatient =  appointmentRepo.findByPatientId(patientId);

			Appointment temp = new Appointment();
			
			if(foundPatient == null){
				MessageResponse mr = new MessageResponse();
				
				mr.success = false;
				mr.error = "Not Found: [patientId: " + patientId + " ]";
			
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
							appointment.add(foundPatient.get(i));
						}						
				}
				
				return new ResponseEntity<List<Appointment>>(appointment,HttpStatus.OK);
			}
			
		}
		
		/**
		 * Get all the prescription of an individual patient.
		 * @param patientId
		 * @return
		 */
		@RequestMapping(value="/{patient_id}/prescriptions", method=RequestMethod.GET)
		public ResponseEntity<?> getAllPrescription(@PathVariable("patient_id")int patientId
				){
			List<Prescription> foundPatient = new ArrayList<Prescription>();
			foundPatient = prescriptionRepo.findByPatientId(patientId);
			MessageResponse mr = new MessageResponse();
			mr.success = true;
			List<Prescription> prescription = new ArrayList<Prescription>();
			prescription = foundPatient;
			if(foundPatient == null){
				
				mr.success = false;
				mr.error ="Not Found: [patientId: " + patientId + " ]";
				
				return new ResponseEntity<MessageResponse>(mr, HttpStatus.NOT_FOUND);	
			}
			for(int i=0; i<foundPatient.size(); i++){
				if(foundPatient.get(i).getIsActive() == false){
					prescription.remove(i);
				}
			}
			return new ResponseEntity<List<Prescription>>(prescription, HttpStatus.OK);
			
		}
		
	

		
		//--------------------------------------------------------------------POST-----------------------------------------------------
		
		/**
		 * Patient requests an Appointment.
		 * @param patientId
		 */
		@RequestMapping(value="/{patient_id}/appointment", method=RequestMethod.POST)
		public ResponseEntity<?> setAppointment(@PathVariable("patient_id")int patientId	
				
				, @RequestBody Appointment newAppointment){
			
			Appointment temp = new Appointment();
			int hpId = newAppointment.getHPId();
			newAppointment.setRequestDate();
			newAppointment.setPatient(patientId);
			newAppointment.setPatientName(patientRepo.findByPatientId(patientId).get(0).getFirstName());
			newAppointment.setHPName(hpRepo.findByHpId(hpId).getUser().getPerson().getFirstName());
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
		
		
		
		/**
		 *  verify email and token that a patient has, and return the patient_id to complete account setup
		 * @param email
		 * @param token
		 * @return ResponseEntity<MessageResponse>
		 */
		@RequestMapping(method=GET, value="/signup/{email}/{token}")
		public ResponseEntity<?> verifyAccountSetupLink(
				@PathVariable("email") String email, @PathVariable("token") String token) {
			
			MessageResponse mr = new MessageResponse();
			mr.success = false;
			
			User uAccount = userRepo.findByEmail(email);
			if (uAccount == null) {
				mr.error = "eof";
			} else if (!uAccount.isTokenValid(token)) {
				mr.error = "eof";
			} else {
				mr.success = true;
			}
			
			if (mr.success == false) {
				return new ResponseEntity<MessageResponse>(mr, HttpStatus.BAD_REQUEST);
			}
			
			return new ResponseEntity<MessageResponse>(mr, HttpStatus.OK);
		}
		
		
		// form from client to set up an account for patient
		private static class patientSignUpForm {
			public String username;
			public String password;
			public String confPassword;
		}
		
		/**
		 * @param patientSignUpForm
		 * @return Patient
		 */
		@RequestMapping(method=POST, value="/signup/{email}/{token}")
		public ResponseEntity<?> setupPatientAccount(
				@PathVariable("email") String email, @PathVariable("token") String token,
				@RequestBody patientSignUpForm form) {
			
			MessageResponse mr = new MessageResponse();
			mr.success = false;
			if (!form.password.equals(form.confPassword)) {
				mr.error = "Passwords not matched.";
				return new ResponseEntity<MessageResponse>(mr, HttpStatus.BAD_REQUEST);
			}
			
			User newAccount = userRepo.findByEmail(email);
			if (newAccount == null) {
				mr.error = "eof";
				mr.error = "Invalid request";
			} else if (!newAccount.isTokenValid(token)) {
				mr.error = "eof";
				mr.message = "Invalid token";
			} else if (userRepo.findByUsername(form.username) != null) {
				mr.error = "duplicate";
				mr.message = "Username already exists.";
			} else {
				mr.success = true;
			}
			
			if (mr.success == false) {
				return new ResponseEntity<MessageResponse>(mr, HttpStatus.BAD_REQUEST);
			}
			
			newAccount.setUsername(form.username);
			newAccount.setPassword(form.password);
			newAccount.setVerified(true);
			
			userRepo.save(newAccount);
			
			return new ResponseEntity<MessageResponse>(mr, HttpStatus.OK);
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
		
		
		@RequestMapping(value="{patientId}/hps/{hpId}/appointments/{appointmentId}/cancel", method=RequestMethod.PUT)
		public ResponseEntity<?> deleteAppointment(@PathVariable("hpId")int hpId
				, @PathVariable("patientId")int patientId
				, @PathVariable("appointmentId")int appointmentId){
			
			List<Appointment> foundPatient = appointmentRepo.findByHpIdAndPatientIdAndAppointmentId(hpId, patientId, appointmentId);
			MessageResponse mr = new MessageResponse();
			if(foundPatient==null){
				mr.success = false;
				mr.error ="Not Found: [patientId: " + patientId + " or hpId: " + hpId + "or appointmentId: " + appointmentId + "]";
				mr.message="";
				return new ResponseEntity<MessageResponse>(mr, HttpStatus.NOT_FOUND);
			}
			Appointment appointment = appointmentRepo.findByAppointmentId(appointmentId);
			appointment.setActive(false);
			mr.success = true;
			mr.error="";
			mr.message="You are successfully canceled this appointment on Date: " + appointment.getAppointmentDate() +" !";
			appointmentRepo.save(appointment);
			return new ResponseEntity<MessageResponse>(mr, HttpStatus.OK);	
			
		}
	
		
		
		
	
	
}
