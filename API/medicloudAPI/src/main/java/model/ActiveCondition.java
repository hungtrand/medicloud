package model;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.PrePersist;
import javax.persistence.Table;

import model.Observation;

@Entity
@Table(name="`active_condition`")
public class ActiveCondition {

	@Id
	@GeneratedValue
	@Column(name="active_condition_id")
	private int activeConditionId = 0;
	
	
	@ManyToOne(cascade= CascadeType.ALL)
	@JoinColumn(name="patient_id", insertable=false, updatable=false)
	private Patient patient;
	
	@Column(name="patient_id")
	private int patientId;
	
	@ManyToOne(cascade=CascadeType.ALL)
	@JoinColumn(name="start_obs_id",nullable = true, insertable=false, updatable=false)
	private Observation sObservation;
	
	@ManyToOne(cascade=CascadeType.ALL)
	@JoinColumn(name="end_obs_id", nullable= true, insertable=false, updatable=false)
	private Observation eObservation;

	
	@Column(name="description")
	private String description;
	
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name="condition_id", nullable=true, insertable=false, updatable=false)
	private Condition condition;
	
	@Column(name="condition_id")
	private int conditionId;
	
	@Column(name="severity")
	private String severity;
	
	@Column(name="date_created")
	private Date dateCreated;
	
	public ActiveCondition(Condition cond, Patient patient) {
		this.condition = cond;
		this.patient = patient;
	}
	
	public int getConditionId(){
		return this.condition.getConditionId();
	}
	
	public String getDescription() {
		return this.description;
	}
	
	public String getSeverity() {
		return this.severity;
	}
	
	public String getDateCreated() {
		if (this.dateCreated == null) return "";
		DateFormat formatDate = new SimpleDateFormat("MM/dd/yyyy");
		
		return formatDate.format(this.dateCreated);
	}
	
	public int getActiveConditionId(){
		return this.activeConditionId;
	}
	
	public Observation getStartObservation(){
		return this.sObservation;
	}
	public Observation getEndObservation(){
		return this.eObservation;
	}
	public void setStartObsId(int sid){
		this.sObservation.setObsId(sid);;
	}
	public void setEndObsId(int eid){
		this.eObservation.setObsId(eid);
	}
	public void setPatientId(int newPatientId){
		this.patientId = newPatientId;
	}
	
	public void setDescription(String newDescription){
		this.description = newDescription;
	}
	
	public void setSeverity(String severity) {
		if (severity.equals("mild") || severity.equals("moderate") || severity.equals("high")) {
			this.severity = severity.toLowerCase();
		}
	}
	
	@PrePersist
	public void setDateCreated() {
		this.dateCreated = new Date();
	}

	public static ActiveCondition create(Condition cond, Patient patient) {
		ActiveCondition newAC = new ActiveCondition(cond, patient);
		newAC.conditionId = cond.getConditionId();
		newAC.patientId = patient.getPatientId();
		
		return newAC;
	}
	
	
	
}
