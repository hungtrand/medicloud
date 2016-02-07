package model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Table;

@Entity
@Table(name="contact")
public class Contact {

	public Contact(){
		
	}
	
	@Id
	@GeneratedValue
	@Column(name="contact_id")
	private int contactId = 0;
	
	@Column(name="personId")
	private int personId;
	
	@Column(name="email")
	private String email;
	
	@Column(name="phone")
	private String phone;
	
	@Column(name="address")
	private String address;
	
	@Column(name="city")
	private String city;
	
	@Column(name="state")
	private String state;
	
	@Column(name="zip")
	private int zip;
	
	public int getContactId(){
		return this.contactId;
	}
	public int getPersonId(){
		return this.personId;
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
	
	public void setContactId(int newContactID){
		this.contactId = newContactID;
	}
	public void setPersonId(int newPersonID){
		this.personId = newPersonID;
	}
	public void setEmail(String newEmail){
		this.email = newEmail;
	}
	public void setAddress(String newAddress){
		this.address = newAddress;
	}
	public void setPhone(String newPhone){
		this.phone = newPhone;
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