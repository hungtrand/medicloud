package model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;



@Entity
@Table(name="note")
public class Note {

	@Id
	@Column(name="note_id")
	@GeneratedValue
	private int noteId = 0;
	
//	@ManyToOne
//	@JoinColumn(name="")
//	
	@ManyToOne(cascade=CascadeType.ALL)
	@JoinColumn(name="patient_id", insertable = false, updatable=false, referencedColumnName="patient_id")
	private Patient patient;
	
	@Column(name="patient_id")
	private int patientId;
	
	@Column(name="text")
	private String text;
	
	@Column(name="creator")
	private String creator;
	
//	@OneToMany(cascade=CascadeType.ALL)
//	@JoinColumn(name="encounter_id")
//	private List<Encounter> encounter = new ArrayList<Encounter>();
	

	public int getNoteId(){
		return this.noteId;
	}
//	public List<Encounter> getEncounter(){
//		return this.encounter;
//	}
	
	public int getPatientId(){
		return this.patient.getPatientId();
	}
	
	public void setPatientId(int newPatientId){
		this.patientId = newPatientId;
	}
	
//	public void setEncounter(Encounter newEncounter){
//		this.encounter.add(newEncounter);
//	}
	public void setNoteId(int newId){
		this.noteId = newId;
	}
	
	public String getText(){
		return this.text;  
	}
	public void setText(String newText){
		this.text = newText;
	}
	
	public String getCreator(){
		return this.creator;
	}
	public void setCreator(String newCreatorName){
		this.creator = newCreatorName;
	}
}
