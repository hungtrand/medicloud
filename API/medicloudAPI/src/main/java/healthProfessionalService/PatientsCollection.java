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

import javax.websocket.server.PathParam;

import org.springframework.web.bind.annotation.RestController;

import repository.AppointmentRepo;
import repository.Contact_repo;
import repository.HealthProfessional_repo;
import repository.NoteRepo;
import repository.PatientRepo;
import repository.PersonDao;
import repository.PersonalViewRepo;
import repository.Role_repo;
import repository.User_repo;
import model.PersonalView;
import model.Role;
import model.User;
//import model.DoctorAvailability.CalculateTime;
import model.Person;
import model.Appointment;
import model.Contact;
import model.HealthProfessional;
import model.Note;
import model.Patient;
import provider.MessageResponse;
import org.jsondoc.core.annotation.*;
@RestController
@Api(name="Patient Collections Service for Health Professionals", description="Health professional get, create, or update patients' informations.")
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
	
	@Autowired
	private Role_repo roleRepo;
	
	
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
		
		Role patientRole = roleRepo.findByDescription("ROLE_PATIENT");
		if (patientRole == null) {
			patientRole = Role.create("ROLE_PATIENT");
		}
		
		u.setRole(patientRole);
		
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
	
	/**
	 * Health professional views all of his/her patients.
	 * @param hpId -health professional id.
	 * @return - list of patients.
	 */
	// GET [collections]: /api/hp/{hpId}/patients
	@RequestMapping(value = "", method=RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	@ApiMethod(description="Health professional views his or her patients information.")
	public List<Patient> getPatients(@ApiPathParam(name="health professional id")@PathVariable("hpId") int hpId) {
		Iterable<Patient> patients = new ArrayList<Patient>();
		patients = patientRepo.findByHpId(hpId);
		return (List<Patient>) patients;
		
	}
	
	
	
	
	
		
	
	//-----------------------------------------------------POST--------------------------------------
	//helper class to collect patient information.
	public static class addPatientForm {
		public String firstName;
		public String lastName;
		public String email;
		public String birthdate;
	}
	
	
	
	/**
	 * Health professional add new patient. 
	 * @param hpId
	 * @param newPatientForm
	 * @return
	 * @throws Exception
	 */
	// POST: /api/hp/{hpId}/patients
	@RequestMapping(value = "", method=RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ApiMethod(description="Health professional adds new patient.")
	public ResponseEntity<?> addPatient(@ApiPathParam(name="Health professional id")@PathVariable("hpId") int hpId, 
			@ApiBodyObject @RequestBody addPatientForm newPatientForm) throws Exception {
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
			vMsg += "http://" + this.clientRoot + "/patientSignUp/#/" 
					+ URLEncoder.encode(newPatientUser.getEmail(), "UTF-8") 
					+  "?token=" + newPatientUser.getVerificationKey();
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
			System.out.println("Unsupported Encoding UTF-8");
		}
		
		
		SimpleMailMessage msg = new SimpleMailMessage();
		msg.setFrom("medicloud.sjsu@gmail.com");
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
	
	
	/**
	 * Health professional add existing patient to his/her connection.
	 * @param hpId
	 * @param personId
	 * @param addCode
	 * @return
	 */
	@RequestMapping(value="/{personId}", method=RequestMethod.POST)
	@ApiMethod(description="Health Professional adds an existing Patient")
	public ResponseEntity<?> addExistingPatient(@ApiPathParam(name="Health Professional Id")@PathVariable("hpId")int hpId
			, @ApiPathParam(name="Patient Id")@PathVariable("personId")int personId
			, @ApiPathParam(name="patient's code")@PathParam("addCode")int addCode){
		Patient connected = patientRepo.findByHpIdAndPatientId(hpId, personId);
		if(connected != null){
			MessageResponse mr = new MessageResponse();
			mr.success = false;
			mr.error ="Cannot Add this patient!";
			mr.message = "Patient is connected";
			return new ResponseEntity<MessageResponse>(mr, HttpStatus.NOT_ACCEPTABLE);
		}
		
		
		User foundUser = userRepo.findByPersonId(personId);

		//patient generated code. 
		int userCode = foundUser.getInvitationCode();
		
		//check if code is valid.
		if(userCode != addCode){
			MessageResponse mr = new MessageResponse();
			mr.success = false;
			mr.error = "Not Found: Invitation Code: [ " + addCode + " ] ";
			mr.message = "Wrong inviation code.";
			return new ResponseEntity<MessageResponse>(mr, HttpStatus.NOT_FOUND);
		}
	
		Person person = personDao.findByPersonId(personId);
		
		HealthProfessional hp = hpRepo.findByHpId(hpId);
		
		Patient patient = Patient.create(person, hp);
		patientRepo.save(patient);
		
		return new ResponseEntity<String>("Success!",HttpStatus.OK );
	}
	
	
	
	
	
	
	

}
