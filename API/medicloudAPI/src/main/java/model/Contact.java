package model;

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
	
	@Id
	@GeneratedValue
	@Column(name="contact_id")
	private int contactId = 0;
	
	@ManyToOne(cascade=CascadeType.ALL)
	@JoinColumn(name="user_id", updatable=true, referencedColumnName="user_id")
	private User user;
	
	@Column(name="email")
	private String primaryEmail;
	
	@Column(name="phone")
	private String primaryPhone;
	
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
	
	public int getContactId(){
		return this.contactId;
	}
	public String getEmail(){
		return this.primaryEmail;
	}
	public String getPhone(){
		return this.primaryPhone;
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
	
	public void setEmail(String newEmail){
		this.primaryEmail = newEmail;
	}
	public void setAddress(String newAddress){
		this.address = newAddress;
	}
	public void setPhone(String newPhone){
		this.primaryPhone = newPhone;
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
	
	public void setUser(User newUser) {
		this.user = newUser;
	}
	
	public static Contact create(User u) {
		return new Contact(u);
	}
}
