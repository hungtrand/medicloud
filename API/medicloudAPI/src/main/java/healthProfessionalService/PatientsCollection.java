package healthProfessionalService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import static org.springframework.web.bind.annotation.RequestMethod.*;
import provider.SessionIdentifierGenerator;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.RestController;

import repository.AppointmentRepo;
import repository.Contact_repo;
import repository.HealthProfessional_repo;
import repository.NoteRepo;
import repository.PatientRepo;
import repository.PersonDao;
import repository.PersonalViewRepo;
import repository.User_repo;
import model.PersonalView;
import model.User;
//import model.DoctorAvailability.CalculateTime;
import model.Person;
import model.Appointment;
import model.Contact;
import model.HealthProfessional;
import model.Note;
import model.Patient;
import provider.MessageResponse;

@RestController
@RequestMapping(value="/api/hp/{hpId}/patients")
public class PatientsCollection {
	
	@Autowired
	private PersonDao personDao;
	
	@Autowired
	private PatientRepo patientRepo;
	
	@Autowired
	private HealthProfessional_repo hpRepo;
	
	@Autowired
	private User_repo userRepo;
	
	@Autowired
	private Contact_repo contactRepo;
	
	@Autowired
	private AppointmentRepo appointmentRepo;
	
	
	@Value("${client.root}")
	private String clientRoot;
	
	@Autowired
	private JavaMailSender mailer;
	
	public PatientsCollection() {
		
	}
	
	@Transactional
	private Patient saveNewPatient(int hpId, addPatientForm newPatientForm) throws Exception {
		HealthProfessional hp = hpRepo.findByHpId(hpId);
		
		Person p = Person.create(newPatientForm.firstName, newPatientForm.lastName);
		p.setBirthdate(newPatientForm.birthdate);
		p = personDao.save(p);
		
		User u = User.create(null, newPatientForm.email, null, p);
		u.setPerson(p);
		u.setVerificationKey();
		
		u = userRepo.save(u);
		
		Contact c = Contact.create(p);
		c.setEmail(newPatientForm.email);
		
		c = contactRepo.save(c);
		
		Patient newPatient = Patient.create(p, hp);
		newPatient = patientRepo.save(newPatient);
		
		if (p != null && u != null && newPatient != null && c != null) {
			this.sendVerificationEmailForNewPatient(u);
		}
		
		return newPatient;
	}
	
	// GET [collections]: /api/hp/{hpId}/patients
	@RequestMapping(value = "", method=RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public List<Patient> getPatients(@PathVariable("hpId") int hpId) {
		Iterable<Patient> patients = new ArrayList<Patient>();
		patients = patientRepo.findByHpId(hpId);
		return (List<Patient>) patients;
		
	}
	
	
	/**
	 * Doctor's Availability on daily base.
	 * @param newAvailableTime
	 */
	@RequestMapping(value="/availability", method=RequestMethod.GET)

	public List<String> getDoctorAvailableTime( @PathVariable("hpId")int hpId
			){
		List<Appointment> appointment = new ArrayList<Appointment>();
		List<String> temp = new ArrayList<String>();
		Appointment start = new Appointment();
		appointment.add(start);
		temp = start.defaultAppointmentAvailability();

		appointment = appointmentRepo.findByAppointmentDate("2016-08-01");
		
		
		if(appointment!= null){
				
				for(int i =0; i<appointment.size(); i++){
					temp.remove(appointment.get(i).getAppointmentTime());			
				}
	
			return temp;
		}else{
		
		return temp;
		}
	}
	
	
		
	
	//-----------------------------------------------------POST--------------------------------------
	
	public static class addPatientForm {
		public String firstName;
		public String lastName;
		public String email;
		public String birthdate;
	}
	
	// POST: /api/hp/{hpId}/patients
	@RequestMapping(value = "", method=RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> addPatient(@PathVariable("hpId") int hpId, @RequestBody addPatientForm newPatientForm) throws Exception {
		HealthProfessional hp = hpRepo.findByHpId(hpId);
		
		if (personDao.findByFirstName(newPatientForm.firstName) != null && personDao.findByLastName(newPatientForm.lastName) != null && personDao.findByBirthdate(newPatientForm.birthdate) != null) {
			MessageResponse mr = new MessageResponse();
			mr.success = false;
			mr.error = "Person Exists";
			
			return new ResponseEntity<MessageResponse>(mr, HttpStatus.BAD_REQUEST);
		}
		else {
			Patient newPatient = saveNewPatient(hpId, newPatientForm);
			newPatient = patientRepo.findByPatientId(newPatient.getPatientId());
			
			return new ResponseEntity<Patient>(newPatient, HttpStatus.OK);
		}
		
	}	
	
	//	helpers
	private boolean sendVerificationEmailForNewPatient(User newPatientUser) {
		String vMsg = "Please click on the following link (or copy & paste it to your browser's address bar): \n";
		try {
			vMsg += "http://localhost/patientSignUp/#/" 
					+ URLEncoder.encode(newPatientUser.getEmail(), "UTF-8") 
					+  "?token=" + newPatientUser.getVerificationKey();
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
			System.out.println("Unsupported Encoding UTF-8");
		}
		
		
		SimpleMailMessage msg = new SimpleMailMessage();
		msg.setTo(newPatientUser.getEmail());
		msg.setCc("medicloud.sjsu@gmail.com");
		msg.setSubject("Verify your Medicloud account.");
		msg.setText(vMsg);
		
		try {
			mailer.send(msg);
			
			return true;
		} catch (MailException ex) {
            // simply log it and go on...
            System.err.println(ex.getMessage());
            System.out.println(ex.getMessage());
            return false;
        }
	}
	
	
	
	
	
	

}
