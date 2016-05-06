package model;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name="lab_result")
public class LabResult {

	public LabResult(){
		
	}
	
	@Id
	@Column(name="lab_result_id")
	@GeneratedValue
	private int labResultId;
	
	@ManyToOne(fetch = FetchType.LAZY, cascade= CascadeType.ALL)
	@JoinColumn(name="hp_id", nullable=true, insertable=false, updatable=false)
	private HealthProfessional hp;
	
	@Column(name="hp_id")
	private int hpId;
	
	@ManyToOne(fetch = FetchType.LAZY, cascade= CascadeType.ALL)
	@JoinColumn(name="patient_id", nullable = true, insertable = false, updatable = false)
	private Patient patient;
	
	@Column(name="patient_id")
	private int patientId;
	
	@Column(name="status")
	private String status;

	@Column(name="result")
	private String result;
	
	@Column(name="last_updated")
	private Date lastUpdated;
	
	@ManyToOne(cascade=CascadeType.ALL)
	@JoinColumn(name="lab_test_id", nullable = false, insertable = false, updatable = false)
	private LabTest labTest;
	
	@Column(name="lab_test_id")
	private int labTestId;
	
	public final class LabResultStatus {
		public static final String STARTED = "Started";
		public static final String PENDING = "Pending";
		public static final String RECEIVED = "Received";
		public static final String PROCESSING = "Processing";
		public static final String DELIVERED = "Delivered";
		public static final String COMPLETED = "Completed";
		public static final String CANCELLED = "Cancelled";
	}
	
	@JsonIgnore
	public LabResultStatus getLabResultStatucChoices() {
		return new LabResultStatus();
	}
	
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
	
	public String getStatus() {
		return this.status;
	}
	
	public String getResult(){
		return this.result;
	}
	
	public String getName() {
		return this.labTest.getName();
	}
	
	public String getCategory() {
		return this.labTest.getCategory();
	}
	
	public String getLastUpdated() {
		if (this.lastUpdated == null) return "";
		DateFormat formatDate = new SimpleDateFormat("MM/dd/yyyy h:mm a");
		
		return formatDate.format(this.lastUpdated);
	}

	public void setHpId(int newHpId){
		this.hpId = newHpId;
	}
	public void setPatientId(int newPatientId){
		this.patientId = newPatientId;
	}
	public void setStatus(String newStatus) {
		this.status = newStatus;
	}
	public void setResult(String newResult){
		this.result = newResult;
	}
	
	@PrePersist
	@PreUpdate
	public void setLastUpdated(){
		this.lastUpdated = new Date();
	}
	
	public static LabResult create(LabTest labTest, Patient patient, HealthProfessional hp) {
		LabResult newLabResult = new LabResult();
		newLabResult.patientId = patient.getPatientId();
		newLabResult.patient = patient;
		newLabResult.hp = hp;
		newLabResult.hpId = hp.getHpId();
		newLabResult.labTest = labTest;
		newLabResult.labTestId = labTest.getLabTestId();
		newLabResult.status = LabResultStatus.STARTED;
		
		return newLabResult;
	}
}
