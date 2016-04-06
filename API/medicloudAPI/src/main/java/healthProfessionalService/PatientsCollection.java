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

import repository.HealthProfessional_repo;
import repository.NoteRepo;
import repository.PatientRepo;
import repository.PersonDao;
import repository.PersonalViewRepo;

import model.PersonalView;
import model.User;
import model.Person;
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
	
	@Value("${client.root}")
	private String clientRoot;
	
	@Autowired
	private JavaMailSender mailer;
	
	public PatientsCollection() {
		
	}
	
	// GET [collections]: /api/hp/{hpId}/patients
	@RequestMapping(value = "", method=RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public List<Patient> getPatients(@PathVariable("hpId") int hpId) {
		Iterable<Patient> patients = new ArrayList<Patient>();
		patients = patientRepo.findByHpId(hpId);
		return (List<Patient>) patients;
		
	}
	
	public static class addPatientForm {
		public String firstName;
		public String lastName;
		public String email;
		public String birthdate;
	}
	
	// POST: /api/hp/{hpId}/patients
	@Transactional
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
			Person p = Person.create(newPatientForm.firstName, newPatientForm.lastName);
			p.setBirthdate(newPatientForm.birthdate);
			personDao.save(p);
			
			User u = User.create(null, newPatientForm.email, null);
			u.setVerificationKey();
			
			Patient newPatient = Patient.create(p, hp);
			this.sendVerificationEmailForNewPatient(u);
			
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
