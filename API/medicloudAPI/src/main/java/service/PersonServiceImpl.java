package service;


import org.apache.catalina.startup.ClassLoaderFactory.Repository;

import org.hibernate.mapping.Collection;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import static org.springframework.web.bind.annotation.RequestMethod.*;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.util.JSONPObject;
import com.mysql.fabric.Response;


import repository.NoteDao;
import repository.PersonDao;
import repository.PersonalViewRepo;

import model.PersonalView;
import model.Person;
import model.Encounter;
import model.Note;
import model.Contact;
import repository.ContactRepo;
import provider.MessageResponse;

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
	private NoteDao noteDao;
	
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
				p.setNote(noteDao.findByNoteId(id));
		
		return p;
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
		
		return noteDao.findByNoteId(id);
	}
		
	
	@RequestMapping(method=GET, value="/persons")
	public Iterable<Person> loadPersons() {
		Iterable<Person> people = new ArrayList<Person>();
		people = personDao.findAll();
		return people;
	}
	
	@RequestMapping(method=POST, value="/addPerson")
	public Person addPerson(@RequestBody Person personToAdd) {
		MessageResponse mr = new MessageResponse();
		System.out.println(personToAdd.getBirthdate());
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
}

