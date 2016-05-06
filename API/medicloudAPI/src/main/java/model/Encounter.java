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
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OrderBy;
import javax.persistence.PrePersist;
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
	
	@ManyToOne(fetch = FetchType.LAZY, cascade=CascadeType.ALL)
	@JoinColumn(name="patient_id", insertable=false, updatable= false, nullable=false, referencedColumnName="patient_id")
	private Patient patient;
	
	@Column(name="patient_id")
	private int patientId;
	
	@ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name="hp_id", insertable = false, updatable = false, nullable = false, referencedColumnName="hp_id")
	private HealthProfessional healthProfessional;
	
	@Column(name="hp_id")
	private int hpId;
	
	@OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name="encounter_id")
	@OrderBy("date_created DESC")
	private List<Observation> observations = new ArrayList<Observation>();
	
	@Column(name="description")
	private String description;
	
	@Column(name="encounter_datetime")
	private String encounterDatetime;
	
	@Column(name="date_created")
	private Date dateCreated;
	
	// Getters
	public int getEncounterId(){
		return this.encounterId;
	}
	
	public String getEncounterDateTime(){
		return this.encounterDatetime;
	}
	
	public String getDateCreated(){
		if (this.dateCreated == null) return "";
		DateFormat formatDate = new SimpleDateFormat("MM/dd/yyyy");
		
		return formatDate.format(this.dateCreated);
	}
	
	public List<Observation> getObservations() {
		return this.observations;
	}
	
	public String getDescription(){
		return this.description;
	}
	
	public void setEncounterDate(String newEncounterDate){
		this.encounterDatetime = newEncounterDate;
	}
	
	public void setDescription(String newDescription){
		this.description = newDescription;
	}
	
	@PrePersist
	public void setDateCreated() {
		this.dateCreated = new Date();
	}
	
	public static Encounter create(String encounterDate, String encounterReason, Patient pt, HealthProfessional hp) {
		Encounter newEnco = new Encounter();
		newEnco.description = encounterReason;
		newEnco.encounterDatetime = encounterDate;
		newEnco.patientId = pt.getPatientId();
		newEnco.hpId = hp.getHpId();
		
		return newEnco;
	}
}
