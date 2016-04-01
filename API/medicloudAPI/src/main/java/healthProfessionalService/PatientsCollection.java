package healthProfessionalService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
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
import repository.User_repo;
import model.PersonalView;
import model.User;
import model.Person;
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
	

	// POST: /api/hp/hpId/patients
	@RequestMapping(value = "", method=RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> addPatient(@PathVariable("hpId") int hpId, @RequestBody Person personToAdd) {

		HealthProfessional hp = hpRepo.findByHpId(hpId);
		personToAdd.setVerificationKey(SessionIdentifierGenerator.nextSessionId());
		
		
		if (personDao.findByFirstName(personToAdd.getFirstName()) != null && personDao.findByLastName(personToAdd.getLastName()) != null && personDao.findByBirthdate(personToAdd.getBirthdate()) != null) {
			MessageResponse mr = new MessageResponse();
			mr.success = false;
			mr.error = "Person Exists";
			
			return new ResponseEntity<MessageResponse>(mr, HttpStatus.BAD_REQUEST);
		}
		else {
			Person personPatient = personDao.save(personToAdd);
			
			Patient newPatient = Patient.create(personPatient, hp);
			this.sendVerificationEmailForNewPatient(personToAdd);
			
			return new ResponseEntity<Patient>(newPatient, HttpStatus.OK);
		}
		
	}
	
//	@RequestMapping(value="/existingPatient", method=RequestMethod.POST)
//	public ResponseEntity<?> addExistingPatient(@PathVariable("hpId")int hpId, @RequestBody Patient patientToAdd){
//		HealthProfessional hp = hpRepo.findByHpId(hpId);
//		
//		
//		
//		if (personDao.findByFirstName(personToAdd.getFirstName()) != null && personDao.findByLastName(personToAdd.getLastName()) != null && personDao.findByBirthdate(personToAdd.getBirthdate()) != null) {
//			MessageResponse mr = new MessageResponse();
//			mr.success = false;
//			mr.error = "Person Exists";
//			
//			return new ResponseEntity<MessageResponse>(mr, HttpStatus.BAD_REQUEST);
//		}
//		else {
//			Person personPatient = personDao.save(personToAdd);
//			
//			Patient newPatient = Patient.create(personPatient, hp);
//			this.sendVerificationEmailForNewPatient(personToAdd);
//			
//			return new ResponseEntity<Patient>(newPatient, HttpStatus.OK);
//		}
//		return null;
//	}
	
	
	
	//	helpers
	private boolean sendVerificationEmailForNewPatient(Person personSU) {
		String vMsg = "Please click on the following link (or copy & paste it to your browser's address bar): \n";
		try {
			vMsg += "http://localhost/patientSignUp/#/" 
					+ URLEncoder.encode(personSU.getEmail(), "UTF-8") 
					+  "?token=" + personSU.getVerificationKey();
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
			System.out.println("Unsupported Encoding UTF-8");
		}
		
		
		SimpleMailMessage msg = new SimpleMailMessage();
		msg.setTo(personSU.getEmail());
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
