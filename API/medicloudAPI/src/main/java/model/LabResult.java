package model;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="lab_result")
public class LabResult {

	public LabResult(){
		
	}
	
	@Id
	@Column(name="lab_result_id")
	@GeneratedValue
	private int labResultId;
	
	@ManyToOne(cascade= CascadeType.ALL)
	@JoinColumn(name="hp_id", nullable=true, insertable=false, updatable=false)
	private HealthProfessional hp;
	
	@Column(name="hp_id")
	private int hpId;
	
	@ManyToOne(cascade= CascadeType.ALL)
	@JoinColumn(name="patient_id", nullable = true, insertable = false, updatable = false)
	private Patient patient;
	
	@Column(name="patient_id")
	private int patientId;

	@Column(name="result")
	private String result;
	
	//Getters
	public int getLabResultId(){
		return this.labResultId;
	}
	public int getHpId(){
		return this.hp.getHpId();
	}
	public int getPatientId(){
		return this.patient.getPatientId();
	}
	public String getResutl(){
		return this.result;
	}
	
	// Setters
	public void setLabResultId(int newLabResultId){
		this.labResultId = newLabResultId;
	}
	public void setHpId(int newHpId){
		this.hpId = newHpId;
	}
	public void setPatientId(int newPatientId){
		this.patientId = newPatientId;
	}
	public void setResult(String newResult){
		this.result = newResult;
	}
	

}
