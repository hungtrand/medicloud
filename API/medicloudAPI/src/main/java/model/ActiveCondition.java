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
	
	@ManyToOne(cascade=CascadeType.ALL)
	@JoinColumn(name="start_obs_id",nullable = true, insertable=false, updatable=false)
	private Observation sObservation;
	
	@ManyToOne(cascade=CascadeType.ALL)
	@JoinColumn(name="end_obs_id", nullable= true, insertable=false, updatable=false)
	private Observation eObservation;

	
	@Column(name="description")
	private String description;
	
//	@ManyToOne(cascade = CascadeType.ALL)
//	@JoinColumn(name="condition_id", nullable=true, insertable=false, updatable=false)
//	private Condition condition;
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
	
//
	
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
	public void setConditionId(int newConditionId){
//		this.conditionId = newConditionId;
	}
	
	
	
}
