package model;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.apache.activemq.filter.function.makeListFunction;


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
	
	
	/**
	 * Get all condition of a patient. This will create a patient id in condition table. Use patient id to access condition.
	 */
	@OneToMany(cascade=CascadeType.ALL)
	@JoinColumn(name="patient_id")
	private List<Condition> condition = new ArrayList<Condition>();
	
	@OneToMany(cascade=CascadeType.ALL)
	@JoinColumn(name="patient_id")
	private List<ActiveCondition> activeCondition = new ArrayList<ActiveCondition>();
	
//	/**
//	 * Get all observations of a patient.
//	 * 
//	 */
//	@OneToMany(cascade=CascadeType.ALL)
//	@JoinColumn(name="patient_id")
//	private List<Observation> observation = new ArrayList<Observation>();
//	
	
	/**
	 * Get all notes of a patient.
	 * @annotation(One to many) - It has one to many relation with patient and note table.
	 * @annotation(JoinColumn) this is the owner of relationship.
	 * Join column create a relation column in note table.
	 * @para patient_id - name of the relationship column which is a primary key of patient table.
	 * 
	 */

	/**
	 * Create a column which foreign key constraint in encounter table.
	 * @annotation(One to many) - It has one to many relation with patient and encounter table.
	 * @annotation(JoinColumn)  - This is the owner of relationship.
	 * Join Column create a relation column in encounter table.
	 * @para patient_id - name of the relationship column which is a primary key of patient table.
	 */
	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name="patient_id")
	private List<Encounter> encounter = new ArrayList<Encounter>();
	
	
	public List<ActiveCondition> getActiveCondition(){
		return this.activeCondition;
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
	
	/**
	 * Get the first name of the patient. 
	 * @return
	 */
	public String getFirstName(){
		return this.person.getFirstName();
	}
	
	public String getLastName(){
		return this.person.getLastName();
	}
	
//	public List<Note> getNotes(){
//		return this.note;
//	}
//	public List<Observation> getObservation(){
//		return this.observation;
//	}
	public List<Condition> getConditions(){
		return this.condition;
	}
	public void setConditions(Condition condition){
		this.condition.add(condition);
	}
//	public void setObservation(Observation obs){
//		this.observation.add(obs);
//	}
	
	public void setActiveCondition(ActiveCondition activeCondtion){
		this.activeCondition.add(activeCondtion);
	}
	
//	@Column(name="patient_name")
//	private String name;
//	
//	public String getName(){
//		return this.name;
//	}
//	
//	public void setName(String newName){
//		this.name = newName;
//	}
	
//	@OneToOne(cascade=CascadeType.ALL)
//	@JoinColumn(name="person_id", referencedColumnName="person_id", insertable = false, updatable = false)
//	private Person person;
//	
//	@Column(name="person_id")
//	private int person_id;
//	
//	public int getPersonId(){
//		return this.person.getPersonId();
//	}
	public int getPatientId(){
		return this.patientId;
	}
	
	
//	
//	public void setPersonId(int newPersonId){
//		this.person_id = newPersonId;
//	}
	public void setPatientId(int newPatientId){
		this.patientId = newPatientId;
	}
	
	public static Patient create(Person p, HealthProfessional hp) {
		Patient newPatient = new Patient();
		newPatient.personId = p.getPersonId();
		newPatient.hpId = hp.getHpId();
		
		return newPatient;
	}
}
