package model;

import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import model.HealthProfessional;
import model.Patient;

@Entity
@Table(name="appointment")
public class Appointment {

	@Id
	@Column(name="appointment")
	@GeneratedValue
	private int appointmentId = 0;
	
	

	@Column(name="appointmentDate")
	private String appointmentDate;
	
	
	@Column(name="patient_name")
	private String patientName;
	
	@Column(name="hp_name")
	private String hpName;

	@ManyToMany(cascade = CascadeType.ALL)
	@JoinTable(name="hpAppointment", joinColumns = {@JoinColumn(name ="appointmentId")}, inverseJoinColumns={@JoinColumn(name="hp_id")})
	private Set<HealthProfessional> hp = new HashSet<HealthProfessional>();
	
	@Column(name="hp_id")
	private int hpId;
	
	@ManyToMany(cascade = CascadeType.ALL)
	@JoinTable(name="hpAppointment", joinColumns = {@JoinColumn(name="appointmentId")}, inverseJoinColumns={@JoinColumn(name="patient_id")})
	private Set<Patient> patient = new HashSet<Patient>();
	
	@Column(name="patient_id")
	private int patientId;
	
	@Column(name="appointment_time")
	private String appointmentTime;

	@Column(name="is_Encounter")
	private boolean isEncounter;
	
	@Column(name="encounter_id")
	private int encounterId;
	
	@Column(name="reason")
	private String reason;
	
	
	public Appointment(){
		this.getPatientId();
	}
	
	//Getters
	public int getAppointmentId(){
		return this.appointmentId;
	}
	public int getHealthProfessionalId(){
		return this.hpId;
	}
	public Iterator<Patient> getPatientId(){
		int temp = 0;
		if(patient.iterator().hasNext()){
			temp++;
			System.out.println("temp");
			return this.patient.iterator();
		}
		
		return null;
	}
	
	public String getPatientName(){
		return this.patientName;
	}
	public String getAppointmentDate(){
		return this.appointmentDate;
	}
	public String getHPName(){
		return this.hpName;
	}
	public String getAppointmentTime(){
		return this.appointmentTime;
	}
	public int getEncounterId(){
		return this.encounterId;
	}
	public boolean getIsEncounter(){
		return this.isEncounter;
	}
	public String getReason(){
		return this.reason;
	}
	
	
	//Setters
	public void setAppointmentId(int newId){
		this.appointmentId = newId;
	}
	public void setPersonId(int newPersonId){
		this.patientId = newPersonId;
	}
	public void setHPId(int newHPId){
		this.hpId = newHPId;
	}
	public void setPersonName(String newPersonName){
		this.patientName = newPersonName;
	}
	public void setHPName(String newHPName){
		this.hpName = newHPName;
	}
	public void setReason(String newReason){
		this.reason = newReason;
		
	}
	public void setNewDate(String newDate){
		this.appointmentDate = newDate;
	}
	public void setNewTime(String newTime){
		this.appointmentTime = newTime;
	}
	public void setEncounterId(int newEncounter){
		this.encounterId = newEncounter;
	}
	public void setIsEncounter(boolean newIsEncounter){
		this.isEncounter = newIsEncounter;
	}
	
	

}
