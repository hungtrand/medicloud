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


import org.springframework.beans.factory.annotation.Autowired;

import repository.User_repo;


@Entity
@Table(name="contact")
public class Contact {
	
	//variables
	@Id
	@GeneratedValue
	@Column(name="contact_id")
	private int contactId = 0;
	
	@ManyToOne(cascade=CascadeType.ALL)
	@JoinColumn(name="person_id", updatable=false, insertable=false, referencedColumnName="person_id")
	private Person person;
	
	@Column(name="person_id")
	private int personId;
	
	@Column(name="email")
	private String email;
	
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

	@Column(name="latest_updated")
	private String latestUpdate;
	
	//Constructor
	public Contact(){
		
	}
	
	//Getters
	public int getContactId(){
		return this.contactId;
	}
	
	public String getEmail() {
		return this.email;
	}
	
	public String getCountry(){
		return this.country;
	}
	public String getLatestUpdate(){
		return this.latestUpdate;
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
	
	public void setEmail(String newEmail) {
		this.email = newEmail;
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
	public void setLatestUpdated(){
		this.latestUpdate = new SimpleDateFormat("yyyy.MM.dd.HH.mm.ss").format(new Date().getTime());
	}
	public void setPerson(Person p) {
		this.person = p;
	}
	public static Contact create(Person p) {
		Contact newContact = new Contact();
		newContact.setPerson(p);
		newContact.personId = p.getPersonId();
		
		return newContact;

	}
}
