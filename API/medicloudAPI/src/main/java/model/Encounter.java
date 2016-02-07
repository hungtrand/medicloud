package model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="encounter")
public class Encounter {

	public Encounter(){
		
	}
	
	@Id
	@GeneratedValue
	@Column(name="encounter_id")
	private int encounterId;
	
	@Column(name="patient_id")
	private int patientId;
	
}
