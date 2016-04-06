package model;

import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import model.Contact;


@Entity
@Table(name="person")
public class Person {
	
	
	@Id
	@Column(name="person_id")
	@GeneratedValue
	private int personId = 0;
	
	@OneToMany(cascade=CascadeType.ALL)
	@JoinColumn(name="person_id")
	private List<Contact> contact;
	
	
	@Column(name="first_name")
	private String firstName;
	
	@Column(name="middle_name")
	private String middleName;
	
	@Column(name="last_name")
	private String lastName;
	
	@Column(name="birthdate")
	private String birthdate;
	
	public Person() {
		
	}
	
	public Person(String firstName, String lastName) {
		this.setFirstName(firstName);
		this.setLastName(lastName);
	}
	
	public int getPersonId() {
		return personId;
	}

	public List<Contact> getContactInfo(){
		return this.contact;
	}
	
	
	public String getMiddleName(){
		return this.middleName;
	}
	
	public void setContactInfo(Contact newContactInfo){
		this.contact.add(newContactInfo);
	}
	
	public void setMiddleName(String newMiddleName){
		this.middleName = newMiddleName;
	}
	public void setPersonId(int personId) {
		this.personId = personId;
	}
	
	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	
	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getBirthdate() {
		return birthdate;
	}

	public void setBirthdate(String birthdate) {
		this.birthdate = birthdate;
	}
	
	@Override
	public String toString(){
		return "Person [pId = " + this.personId + ", PersonName = " + this.firstName + " ]";
	}
	
	
	public static Person create(String firstName, String lastName) {
		Person newPerson = new Person(firstName, lastName);
		
		return newPerson;
	}
}


