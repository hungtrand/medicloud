package model;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Scanner;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.springframework.beans.factory.annotation.Autowired;

import model.HealthProfessional;
import model.Patient;
import repository.AppointmentRepo;

@Entity
@Table(name="appointment")
public class Appointment {

//	@Autowired
//	private AppointmentRepo appointmentRepo;
	
	@Id
	@Column(name="appointment_id")
	@GeneratedValue
	private int appointmentId = 0;
	

	@Column(name="appointment_date")
	private String appointmentDate;
	
	
	@Column(name="patient_name")
	private String patientName;
	
	@Column(name="hp_name")
	private String hpName;

	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name="hp_id", insertable = false, updatable=false)
	private HealthProfessional hp; //= new HashSet<HealthProfessional>(0);
	
	@Column(name="hp_id")
	private int hpId;
	
	@ManyToOne(cascade=CascadeType.ALL)
	@JoinColumn(name="patient_id", insertable= false, updatable=false)
	private Patient patient;

	@Column(name="patient_id")
	private int patientId;
	
	@Column(name="appointment_time")
	private String appointmentTime;

	@Column(name="is_encounter")
	private boolean isEncounter;
	
	@Column(name="encounter_id")
	private int encounterId;
	
	@Column(name="reason")
	private String reason;
	
	@Column(name="active")
	private boolean active;
	
	@Column(name="accept_appointment")
	private boolean acceptAppointment;
	
	@Column(name="request_date")
	private String requestDate;
	
	public Appointment(){
		
	}
	
	//Getters
	public String getRequestDate(){
		return this.requestDate;
	}
	public int getAppointmentId(){
		return this.appointmentId;
	}
//	public int getHealthProfessionalId(){
//		 return this.hp.iterator().next().getHpId();
//	}
	
	//HP relationshipid

	//local hpid
	public int getHPId(){
		
		return this.hpId;
	}
	
	public int getPatientId(){
		return this.patientId;
	}

//	public Iterator<Patient> getPatientId(){
//		int temp = 0;
//		if(patient.iterator().hasNext()){
//			temp++;
//			//System.out.println("temp");
//			return this.patient.iterator();
//		}
//		
//		return null;
//	}
	
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
	public boolean getActive(){
		return this.active;
	}
	public boolean getAcceptAppointment(){
		return this.acceptAppointment;
	}
	
	//Setters
	public void setAppointmentId(int newId){
		this.appointmentId = newId;
	}
	public void setPatient(int newPatientId){
		this.patientId = newPatientId;
	}
	public void setHpId(int newHPId){
		this.hpId = newHPId;
	}
	public void setPatientName(String newPatientName){
		this.patientName = newPatientName;
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
	public void setActive(boolean newActive){
		this.active = newActive;
	}
	
	public void setAcceptAppointment(boolean newAcceptAppointment){
		this.acceptAppointment = newAcceptAppointment;
	}
	public void setRequestDate(){
		this.requestDate = new SimpleDateFormat("yyyy-MM-dd-HH-mm-ss").format(new Date().getTime());
	}
	
	public List<String> defaultAppointmentAvailability(){
		double start =9;
		double end = 17;
		List<String> availableTime = new ArrayList<String>();
		double time;
		int temp = (int) (end - start);
		temp = temp*2;
		for(int i = 0; i< temp; i++){
			
			double calculateHour = start;
			calculateHour = calculateHour * 2;
			double cH = calculateHour % 2;
			String number;
			if(cH <= 0){
			number= Integer.toString((int) start) + ":00";
			availableTime.add(number);
			} else{
			number= Integer.toString((int)(start-.5)) + ":30";
				availableTime.add(number);
			}
			
			if(start > 12){	
				start = start - 12;
			}
			
			start = start + 0.5;	
			}
	
		
		return availableTime;
	}


	public int dateTimeChecker(){
		String temp = new SimpleDateFormat("yyyy-MM-dd-HH-mm-ss").format(new Date().getTime());
		Scanner scanDateTime = new Scanner(temp);
		scanDateTime.useDelimiter("-");
		String dateTime="";
		while(scanDateTime.hasNext()){
			dateTime = dateTime + scanDateTime.next();
		}
		return Integer.parseInt(dateTime);
	}
	
	
	

}
