package model;

import java.text.SimpleDateFormat;
import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

<<<<<<< HEAD
import com.fasterxml.jackson.annotation.JsonIgnore;
=======
import org.springframework.beans.factory.annotation.Autowired;

import repository.User_repo;
>>>>>>> 6cc86bf898d374e3c75351459e6fd861e4d46dd9

@Entity
@Table(name="contact")
public class Contact {
	
	@Id
	@GeneratedValue
	@Column(name="contact_id")
	private int contactId = 0;
	
	
	@ManyToOne(cascade=CascadeType.ALL)
<<<<<<< HEAD
	@JoinColumn(name="person_id", nullable = true, insertable = false, updatable = false)
	private Person person;
=======
	@JoinColumn(name="user_id", updatable=true, referencedColumnName="user_id")
	private User user;
>>>>>>> 6cc86bf898d374e3c75351459e6fd861e4d46dd9
	
	@Column(name="person_id")
	private int personId;
	
	@Column(name="phone")
	private String phone;
	
	@Column(name="address")
	private String address;
	
	@Column(name="city")
	private String city;
	
	@Column(name="country")
	private String country;
	
	@Column(name="state")
	private String state;
	
	@Column(name="zip")
	private int zip;

	public Contact(){
		
	}
	
	public Contact(User u) {
		this.setUser(u);
	}
	
	@Column(name="latest_updated")
	private String latestUpdate;
	
	
	
	//Getters
	public int getContactId(){
		return this.contactId;
	}
<<<<<<< HEAD
	public String getCountry(){
		return this.country;
	}
	
	public int getPersonId(){
		return this.person.getPersonId();
	}
	public String getLatestUpdate(){
		return this.latestUpdate;
=======
	public String getEmail(){
		return this.primaryEmail;
>>>>>>> 6cc86bf898d374e3c75351459e6fd861e4d46dd9
	}
	public String getPhone(){
		return this.phone;
	}
	public String getAddress(){
		return this.address;
	}
	public String getCity(){
		return this.city;
	}
	public String getState(){
		return this.state;
	}
	public int getZip(){
		return this.zip;
	}
	
<<<<<<< HEAD
	
	
	//Setters
	public void setContactId(int newContactID){
		this.contactId = newContactID;
	}
	public void setPersonId(int newPersonId){
		this.personId = newPersonId;
=======
	public void setEmail(String newEmail){
		this.primaryEmail = newEmail;
>>>>>>> 6cc86bf898d374e3c75351459e6fd861e4d46dd9
	}
	public void setAddress(String newAddress){
		this.address = newAddress;
	}
	public void setPhone(String newPhone){
		this.phone = newPhone;
	}
	public void setCountry(String newCountry){
		this.country = newCountry;
	}
	public void setCity(String newCity){
		this.city = newCity;
	}
	public void setState(String newState){
		this.state = newState;
	}
	public void setZip(int newZip){
		this.zip = newZip;
	}
<<<<<<< HEAD
	public void setLatestUpdated(){
		this.latestUpdate = new SimpleDateFormat("yyyy.MM.dd.HH.mm.ss").format(new Date().getTime());
=======
	
	public void setUser(User newUser) {
		this.user = newUser;
	}
	
	public static Contact create(User u) {
		return new Contact(u);
>>>>>>> 6cc86bf898d374e3c75351459e6fd861e4d46dd9
	}
}
