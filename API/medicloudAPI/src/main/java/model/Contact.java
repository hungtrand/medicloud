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

@Entity
@Table(name="contact")
public class Contact {

	public Contact(){
		
	}
	
	@Id
	@GeneratedValue
	@Column(name="contact_id")
	private int contactId = 0;
	
	@ManyToOne(cascade=CascadeType.ALL)
	@JoinColumn(name="person_id", nullable = true, insertable = false, updatable = false)
	private Person personId;
	
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
	
	@Column(name="latest_updated")
	private String latestUpdate;
	
	public int getContactId(){
		return this.contactId;
	}
	
	public String getLatestUpdate(){
		return this.latestUpdate;
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
	
	public void setContactId(int newContactID){
		this.contactId = newContactID;
	}
//	public void setPersonId(Person newPersonID){
//		this.personId = newPersonID;
//	}
	
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
	
	public void setLatestUpdated(){
		this.latestUpdate = new SimpleDateFormat("yyyy.MM.dd.HH.mm.ss").format(new Date().getTime());
	}
}
