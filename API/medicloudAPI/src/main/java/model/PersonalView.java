package model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="personalView")
public class PersonalView {

	@Id
	@Column(name="contact_id")
	private int contactId;
	
	@Column(name="person_id")
	private int personId;
	
	@Column(name="first_name")
	private String firstname;
	
	@Column(name="last_name")
	private String lastname;
	
	@Column(name="address")
	private String address;
	
	@Column(name="city")
	private String city;
	
	@Column(name="state")
	private String state;
	
	@Column(name="zip")
	private int zip;
	
	@Column(name="email")
	private String email;
	
	@Column(name="phone")
	private String phone;
	
	
	public int getContactId(){
		return this.contactId;
	}
	public void setContactId(int newContactId){
		this.contactId = newContactId;
	}
	public int getPersonId(){
		return this.personId;
	}
	public String getFirstName(){
		return this.firstname;
	}
	public String getLastName(){
		return this.lastname;
	}
	public String getEmail(){
		return this.email;
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
	
	public void setLastName(String newLastname){
		this.lastname = newLastname;
	}
	
	public void setPersonId(int newId){
		this.personId = newId;
	}
	public void setFirstName(String newFirstName){
		this.firstname = newFirstName;
	}
	public void setEmail(String newEmail){
		this.email = newEmail;
	}
	public void setPhone(String newPhone){
		this.phone = newPhone;
	}
	public void setAddress(String newAddress){
		this.address = newAddress;
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
}
