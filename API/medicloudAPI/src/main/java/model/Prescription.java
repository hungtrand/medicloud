package model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import java.text.SimpleDateFormat;
import java.util.Date;

import javax.persistence.*;

import model.Patient;
import model.HealthProfessional;

@Entity
@Table(name="prescription_drug")
public class Prescription {

	@Id
	@GeneratedValue
	@Column(name="pd_id")
	private int pdId;
	
	@ManyToOne(cascade=CascadeType.ALL)
	@JoinColumn(name="hp_id", updatable=false, insertable=false)
	private HealthProfessional hp;
	
	@Column(name="hp_id")
	private int hpId;
	
	@ManyToOne(cascade=CascadeType.ALL)
	@JoinColumn(name="patient_id", updatable=false, insertable=false)
	private Patient patient;
	
	@Column(name="patient_id")
	private int patientId;
	
	@Column(name="drug_name")
	private String drugName;
	
	@Column(name="number_of_refill")
	private int numberOfRefill;
	
	@Column(name="date_approved")
	private String dateApproved;
	
	@Column(name="drug_type")
	private String drugType;
	
	@Column(name="user_aggrement")
	private String userAgreement;
	
	@Column(name="is_active")
	private boolean isActive;
	
	//Constructor
	public Prescription(){
		
	}
	
	//Getters
	public int getPdId(){
		return this.pdId;
	}
	public int gethpId(){
		return this.hpId;
	}
	public int getPatientId(){
		return this.patientId;
	}
	public String getDrugName(){
		return this.drugName;
	}
	public int getNumberOfRefill(){
		return this.numberOfRefill;
	}
	public String getDateApproved(){
		return this.dateApproved;
	}
	public String getDrugType(){
		return this.drugType;
	}
	public String getUserAgreedment(){
		return this.userAgreement;
	}
	public boolean getIsActive(){
		return this.isActive;
	}
	
	//Setters
	public void setPdId(int newPdId){
		this.pdId = newPdId;
	}
	public void setHpId(int newHpId){
		this.hpId = newHpId;
	}
	public void setPatientId(int newPatientId){
		this.patientId = newPatientId;
	}
	public void setDrugName(String newDrugName){
		this.drugName = newDrugName;
	}
	public void setNumberOfRefill(int newNumberOfRefill){
		this.numberOfRefill = newNumberOfRefill;
	}
	public void setDateApproved(){
		this.dateApproved = new SimpleDateFormat("yyyy.MM.dd.HH.mm.ss").format(new Date().getTime());
	}
	public void setDrugType(String newDrugType){
		this.drugType = newDrugType;
	}
	public void setUserAgreedment(String newUserAgreedment){
		this.userAgreement = newUserAgreedment;
	}
	public void setIsActive(boolean newIsActive){
		this.isActive = newIsActive;
	}
	
	
}
