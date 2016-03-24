package model;

import java.util.Date;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;

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
	@JoinColumn(name="patient_id", insertable=false, updatable= false, nullable= true)
	private Patient patient;
	
	@Column(name="patient_id")
	private int patientId;
	
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name="hp_id", insertable = false, updatable = false, nullable = true)
	private HealthProfessional hp;
	
	@Column(name="hp_id")
	private int hpId;
	
	@Column(name="description")
	private String description;
	
	@Column(name="encounterDatetime")
	private String encounterDatetime;
	
	@Column(name="dateCreated")
	private String dateCreated;
	
	// Getters
	public int getEncounterId(){
		return this.encounterId;
	}
	
	public String getEncounterDateTime(){
		return this.encounterDatetime;
	}
	
	public String getDateCreated(){
		return this.dateCreated;
	}
	
	public int getHpId(){
		return this.hp.getHpId();
	}
	
	public int getPatientId(){
		return this.patient.getPatientId();
	}
	
	public String getDescription(){
		return this.description;
	}
	
	
	
	// Setters
	public void setPatientId(int newPatientId){
		this.patientId = newPatientId;
	}
	
	public void setHpId(int newHpId){
		this.hpId = newHpId;
	}
	
	public void setEncounterDate(String newEncounterDate){
		this.encounterDatetime = newEncounterDate;
	}
	
	public void setDescription(String newDescription){
		this.description = newDescription;
	}
	
	public void setDateCreated(){
		if(this.dateCreated != null){
			this.dateCreated = this.dateCreated;
		}else{
		
			this.dateCreated = new SimpleDateFormat("yyyy.MM.dd.HH.mm.ss").format(new Date().getTime());
		}
	}
	
	
}
