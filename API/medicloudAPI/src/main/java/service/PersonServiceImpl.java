package service;


import org.apache.catalina.startup.ClassLoaderFactory.Repository;

import org.hibernate.mapping.Collection;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Controller;
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

import com.fasterxml.jackson.databind.util.JSONPObject;
import com.mysql.fabric.Response;


import repository.NoteRepo;
import repository.PersonDao;
import repository.PersonalViewRepo;

import model.PersonalView;
import model.Person;
import model.Encounter;
import model.HPSignUp;
import model.Note;
import model.Contact;
import provider.MessageResponse;
import provider.SessionIdentifierGenerator;

@RestController
@RequestMapping(value="/person")
public class PersonServiceImpl {
	public PersonServiceImpl() {
		
	};
	
	@Autowired
	private PersonDao personDao;
	
//	@Autowired
//	private ContactRepo contactRepo;
	
//	@Autowired
//	private repository.personal personal;
//	
	@Autowired
	private NoteRepo noteRepo;
	
	@Value("${client.root}")
	private String clientRoot;
	
	@Autowired
	private JavaMailSender mailer;
	
	
	
//	------------------------------------------------------------GET-----------------------------------------------------------------------------------------------------------------------------
	
	
	@RequestMapping(value = "/api/persons", method=RequestMethod.GET, produces =MediaType.APPLICATION_JSON_VALUE)
	public List<Person> getPerson(){
		Iterable<Person> persons = new ArrayList<Person>();
		persons = personDao.findAll();
		return (List<Person>) persons;
	}

	class Profile{
		public Note noteClass = new Note();
		public void setNote(Note note){
			this.noteClass = note;
		}
		public Person personClass = new Person();
		public void setPerson(Person person){
			this.personClass = person;
		}
	}
	
	@RequestMapping(value="/api/personalInfo/{id}", method=RequestMethod.GET)
	public Profile testing(@PathVariable("id")int id){
		
		Profile p = new Profile();
				p.setPerson(personDao.findByPersonId(id));
				p.setNote(noteRepo.findByNoteId(id));
		
		return p;
	}
	
	private boolean sendVerificationEmailForNewPatient(Person personSU) {
		String vMsg = "Please click on the following link (or copy & paste it to your browser's address bar): \n";
		try {
			vMsg += "http://localhost/patientSignUp/?email=" 
					+ URLEncoder.encode(personSU.getEmail(), "UTF-8") 
					+  "&token=" + personSU.getVerificationKey();
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
	
	@Autowired
	private PersonalViewRepo personalViewRepo;
	
	
	
	@RequestMapping(value="/api/personalViewinfo/{id}", method=RequestMethod.GET)
	public List<PersonalView> getPersonalView(@PathVariable("id")List<Integer> id){
		List<PersonalView> pv = new ArrayList<PersonalView>();
		pv = personalViewRepo.findByPersonId(id);
		return pv;
	}
	
	@RequestMapping(value="/api/persons/note/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public Note getPersonalNote(@PathVariable("id") int id){
		
		return noteRepo.findByNoteId(id);
	}
		
	
	@RequestMapping(method=GET, value="/persons")
	public Iterable<Person> loadPersons() {
		Iterable<Person> people = new ArrayList<Person>();
		people = personDao.findAll();
		return people;
	}
	
	@RequestMapping(method=POST, value="/addPerson")
	public Person addPerson(@RequestBody Person personToAdd) {
		personToAdd.setVerificationKey(SessionIdentifierGenerator.nextSessionId());
		MessageResponse mr = new MessageResponse();
		if (personDao.findByFirstName(personToAdd.getFirstName()) != null && personDao.findByLastName(personToAdd.getLastName()) != null && personDao.findByBirthdate(personToAdd.getBirthdate()) != null) {
			mr.success = false;
			mr.message = "Patient already exists in database.";
			System.out.println("\n\n\n" + mr.message + "\n\n\n");
		}
		else {
			personDao.save(personToAdd);
			mr.success = true;
			mr.message = "Patient successfully added.";
			System.out.println("\n\n\n" + mr.message + "\n\n\n");
			if (this.sendVerificationEmailForNewPatient(personToAdd)) {
				System.out.println("\n\n\n" + mr.message + "\n\n\n");
			}
		}
		return personToAdd;
	}
	
	@RequestMapping(method=GET, value="/deletePerson")
	public Person deletePerson(@RequestParam("personId") int personId) {
		Person personToDelete = new Person();
		personToDelete = personDao.findByPersonId(personId);
		personDao.delete(personToDelete);
		return personToDelete;
	}
	
	@RequestMapping(method=GET, value="/personId")
	public Person loadPersonByPersonId(@RequestParam("personId") int personId) {
		return personDao.findByPersonId(personId);
	}
	
//	----------------------------------------------------------POST-----------------------------------------------------------------------------------------------------------------------------
	
//	----------------------------------------------------------PUT------------------------------------------------------------------------------------------------------------------------------
	
	
	
}

