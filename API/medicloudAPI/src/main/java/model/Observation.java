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
import javax.persistence.PrePersist;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;


@Entity
@Table(name="observation")
public class Observation {

	public Observation(){
		
	}
	
	@Id
	@GeneratedValue
	@Column(name="obs_id")
	private int obsId=1;
	
//	@OneToMany(cascade=CascadeType.ALL)
//	@JoinColumn(name="obs_id")
//	private List<Note> note = new ArrayList<Note>();
	
	@OneToMany(fetch = FetchType.LAZY, cascade=CascadeType.ALL)
	@JoinColumn(name="start_obs_id")
	private List<ActiveCondition> sactiveCondition = new ArrayList<ActiveCondition>();
	
	@OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name="end_obs_id")
	private List<ActiveCondition> eactiveCondition  = new ArrayList<ActiveCondition>();
	
	@ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name="hp_id", insertable=false, updatable=false, referencedColumnName="hp_id")
	private HealthProfessional healthProfessional;
	
	@Column(name="hp_id")
	private int hpId;
	
	@ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name="patient_id", insertable=false, updatable=false, referencedColumnName="patient_id")
	private Patient patient;
	
	@Column(name="patient_id")
	private int patientId;
	
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name="encounter_id", insertable=false, updatable=false, referencedColumnName="encounter_id")
	private Encounter encounter;
	
	@Column(name="encounter_id")
	private int encounterId;
	
	@Column(name="comments")
	private String comments;
	
	@Column(name="state")
	private String state;
	
	@Column(name="date_created")
	private Date dateCreated;
	
	public int getObsId(){
		return this.obsId;
	}
	
	public String getComments(){
		return this.comments;
	}
	
	public HealthProfessional getHealthProfessional(){
		return this.healthProfessional;
	}
	
	@JsonIgnore
	public Patient getPatient(){
		return this.patient;
	}
	
	public String getState(){
		return this.state;
	}
		
//	public List<Note> getAllNote(){
//		return this.note;
//	}
	
	public String getDateCreated(){
		if (this.dateCreated == null) return "";
		DateFormat formatDate = new SimpleDateFormat("MM/dd/yyyy h:mm a");
		
		return formatDate.format(this.dateCreated);
	}
	
	public void setObsId(int newObsId){
		this.obsId = newObsId;
	}

	public void setEncounter(Encounter newEncounter){
		this.encounter = newEncounter;
	}
	public void setComments(String newComments){
		this.comments = newComments;
	}
	
	public void setState(String newState){
		this.state = newState;
	}
	
	@PrePersist
	public void setDateCreated(){
		this.dateCreated = new Date();
	}
	
	public static Observation create(Encounter encounter, HealthProfessional hp, Patient pt, String comments, String state) {
		Observation newObs = new Observation();
		newObs.hpId = hp.getHpId();
		newObs.patientId = pt.getPatientId();
		newObs.encounterId = encounter.getEncounterId();
		newObs.state = state;
		newObs.comments = comments;
		
		return newObs;
	}


}
