package service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import static org.springframework.web.bind.annotation.RequestMethod.*;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.RestController;

import repository.PersonDao;
import model.Person;

@RestController
@RequestMapping(value="/person")
public class PersonServiceImpl {
	public PersonServiceImpl() {
		
	};
	
	@Autowired
	private PersonDao personDao;
	
	@RequestMapping(method=GET, value="/persons")
	public Iterable<Person> loadPersons() {
		Iterable<Person> people = new ArrayList<Person>();
		people = personDao.findAll();
		return people;
	}
	
	@RequestMapping(method=GET, value="/personId")
	public Person loadPersonByPersonId(@RequestParam("personId") int personId) {
		return personDao.findByPersonId(personId);
	}
	
	@RequestMapping(method=GET, value="/whatever")
	public String whateverIWant() {
		return "Whatever I want";
	}
}

