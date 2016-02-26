package model;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

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

import model.Observation;

@Entity
@Table(name="`active_condition`")
public class ActiveCondition {

	@Id
	@GeneratedValue
	@Column(name="active_condition_id")
	private int activeConditionId = 0;
	
	@Column(name="name")
	private String name;

	@ManyToOne(cascade= CascadeType.ALL)
	@JoinColumn(name="patient_id", insertable=false, updatable=false)
	private Patient patient;
	
	@Column(name="patient_id")
	private int patientId;
	
	@OneToOne(cascade=CascadeType.ALL)
	@JoinColumn(name="start_obs", nullable= true, insertable=false, updatable=false, unique = true)
	private Observation sObservation;
	
	@Column(name="start_obs")
	private int startObs;
	
	@OneToOne(cascade=CascadeType.ALL)
	@JoinColumn(name="end_obs", nullable= true, insertable=false, updatable=false)
	private Observation eObservation;
	
	@Column(name="end_obs")
	private int endObs;
	
	@Column(name="description")
	private String description;
	
	public String getDescription(){
		return this.description;
	}
	
	public int getActiveConditionId(){
		return this.activeConditionId;
	}
	public String getName(){
		return this.name;
	}
	public Observation getStartObs(){
		return this.sObservation;
	}
	
	public Observation getEndObs(){
		return this.eObservation;
	}
	
	
	
	public void setStarObs(int newStartObsId){
		this.startObs = newStartObsId;
	}
	
	public void setEndObs(int newEndObsId){
		this.endObs = newEndObsId;
	}
	
	public void setPatientId(int newPatientId){
		this.patientId = newPatientId;
	}
	
	public void setDescription(String newDescription){
		this.description = newDescription;
	}
	public void setActiveConditionId(int newConditionId){
		this.activeConditionId = newConditionId;
	}
	public void setName(String newName){
		this.name = newName;
	}

	
	
}
