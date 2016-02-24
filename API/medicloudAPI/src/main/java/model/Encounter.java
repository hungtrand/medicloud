package model;

import java.sql.Date;
import java.sql.Timestamp;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="encounter")
public class Encounter {

	public Encounter(){
		
	}
	
	@Id
	@GeneratedValue
	@Column(name="encounter_id")
	private int encounterId;
	
	@ManyToOne(cascade=CascadeType.ALL)
	@JoinColumn(name="patient_id", insertable=false, updatable= false)
	private Patient patient;
	
	@Column(name="patient_id")
	private int patientId;
	
	@Column(name="description")
	private String description;
	
	@Column(name="encounterDatetime")
	private Timestamp encounterDatetime;
	
	@Column(name="dateCreated")
	private Date dateCreated;
	
	
	public int getEncounterId(){
		return this.encounterId;
	}
	
	public int getPersonId(){
		return this.patient.getPatientId();
	}
	
	public String getDescription(){
		return this.description;
	}
	
	public void setPersonId(int newPersonId){
		this.patientId = newPersonId;
	}
}
