package model;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.PrePersist;
import javax.persistence.Table;

import org.apache.activemq.filter.function.makeListFunction;
import org.springframework.data.annotation.Transient;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;


@Entity
@Table(name="patient")
public class Patient {
	public Patient(){
		
	}
	
	@Id
	@GeneratedValue
	@Column(name="patient_id")
	private int patientId;
	
	@ManyToOne(cascade=CascadeType.ALL)
	@JoinColumn(name="person_id", insertable=false, updatable=false, referencedColumnName= "person_id")
	private Person person;
	
	@Column(name="person_id" )
	private int personId;
	
	@Column(name="hp_id")
	private int hpId;
	
	@Column(name="patient_since_date")
	private Date patientSinceDate;
	
	@PrePersist
	protected void onCreate() {
		patientSinceDate = new Date();
	}	
	
	@OneToOne(cascade=CascadeType.ALL)
	@JoinColumn(name="hp_id", insertable=false, updatable=false, referencedColumnName= "hp_id")
	private HealthProfessional healthProfessional;
	
	@OneToMany(fetch = FetchType.LAZY, cascade=CascadeType.ALL)
	@JoinColumn(name="patient_id")
	private List<ActiveCondition> activeConditions = new ArrayList<ActiveCondition>();
	
	
	/**
	 * Create a column which foreign key constraint in encounter table.
	 * @annotation(One to many) - It has one to many relation with patient and encounter table.
	 * @annotation(JoinColumn)  - This is the owner of relationship.
	 * Join Column create a relation column in encounter table.
	 * @para patient_id - name of the relationship column which is a primary key of patient table.
	 */
	@OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name="patient_id")
	private List<Encounter> encounter = new ArrayList<Encounter>();
	
	
	public List<ActiveCondition> getConditions(){
		return this.activeConditions;
	}

	/**
	 * Get all the encounters of a patient.
	 * @return - list of encounter.
	 */
	public List<Encounter> getEncounters() {
		return this.encounter;
	}
	
	
	/**
	 * 
	 * @param newEncounter
	 */
	public void setEncounters(Encounter newEncounter){
		this.encounter.add(newEncounter);
	}
	
	public void setPersonId(int newPersonId){
		this.patientId = newPersonId;
	}
	
	public int getPersonId(){
		return this.personId;
	}
	
	@JsonIgnore
	public Person getPerson() {
		return this.person;
	}
	
	public void addActiveCondition(ActiveCondition activeCondtion){
		this.activeConditions.add(activeCondtion);
	}
	
	public int getPatientId(){
		return this.patientId;
	}
	
	public void setPatientId(int newPatientId){
		this.patientId = newPatientId;
	}
	
	public static Patient create(Person p, HealthProfessional hp) {
		Patient newPatient = new Patient();
		newPatient.personId = p.getPersonId();
		newPatient.person = p;
		
		newPatient.hpId = hp.getHpId();
		return newPatient;
	}
	
	public String getFirstName() {
		return this.person.getFirstName();
	}
	
	public String getLastName() {
		return this.person.getLastName();
	}
	
	public String getGender() {
		return this.person.getGender();
	}
	
	public String getEmail() {
		List<Contact> contacts = this.person.getContacts();
		if (contacts.isEmpty()) return null;
		else return contacts.get(0).getEmail();
	}
	
	public String getBirthdate() {
		return this.person.getBirthdate();
	}
	
	public Contact getContact() {
		List<Contact> contacts = this.person.getContacts();
		if (contacts.isEmpty()) return null;
		else return contacts.get(0);
	}
	
	public String getPatientSinceDate() {
		if (this.patientSinceDate == null) return "";
		DateFormat formatDate = new SimpleDateFormat("MM/dd/yyyy");
		
		return formatDate.format(this.patientSinceDate);
	}
}
