package model;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

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
	
	@OneToOne(cascade=CascadeType.ALL)
	@JoinColumn(name="start_obs_id",nullable = true, insertable=false, updatable=false)
	private Observation sObservation;
	
	@Column(name="start_obs_id")
	private int startObsId;
	
	@OneToOne(cascade=CascadeType.ALL)
	@JoinColumn(name="end_obs_id", nullable= true, insertable=false, updatable=false)
	private Observation eObservation;
	
	@Column(name="end_obs_id")
	private int endObsId;
	
	@Column(name="description")
	private String description;
	
//	@OneToOne(cascade = CascadeType.ALL)
//	@JoinColumn(name="condition_id", nullable=true, insertable=false, updatable=false)
//	private Condition condtion;
//	
//	@Column(name="condition_id")
//	private int conditionId;
	
	
//	public int getConditionId(){
//		return this.condtion.getConditionId();
//	}
	
	public String getDescription(){
		return this.description;
	}
	
	public int getActiveConditionId(){
		return this.activeConditionId;
	}
	
	public Observation getEndObsId(){
		return this.eObservation;
	}
	
	public Observation getStartObsId(){
		return this.sObservation;
	}
	
//	public int getEndObsId(){
//		return this.eObservation.getObsId();
//	}
	
//	public void setConditionId(int newConditionId){
//		this.conditionId = newConditionId;
//	}
	
	public void setStarObsId(int newStartObsId){
		this.startObsId = newStartObsId;
	}
	
	public void setEndObsId(int newEndObsId){
		this.endObsId = newEndObsId;
	}
	
//	public void setEndObsId(int newEndObsId){
//		this.endObsId = newEndObsId;
//	}
	
	public void setPatientId(int newPatientId){
		this.patientId = newPatientId;
	}
	
	public void setDescription(String newDescription){
		this.description = newDescription;
	}
	public void setActiveConditionId(int newConditionId){
		this.activeConditionId = newConditionId;
	}
	
	
	
}
