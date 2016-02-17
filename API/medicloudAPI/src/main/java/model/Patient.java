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
	
	@OneToMany(cascade=CascadeType.ALL)
	@JoinColumn(name="patient_id")
	private List<Observation> observation = new ArrayList<Observation>();
	
	public List<Observation> getObservation(){
		return this.observation;
	}
	public void setObservation(Observation obs){
		this.observation.add(obs);
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
}
