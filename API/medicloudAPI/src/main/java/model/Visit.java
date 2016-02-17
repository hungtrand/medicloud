package model;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;


@Entity
@Table(name="visit")
public class Visit {

	public Visit(){
		
	}
	
	@Id
	@GeneratedValue
	@Column(name="visit_id")
	private int visitId;
	
//	@JoinColumn(name="patient_id")
//	private Person patientId;
//	
//	@JoinColumn(name="cdo_id")
//	private Cdo cdoId;
	
	@Column(name="visit_type")
	private String visitType;
	
	@Column(name="description")
	private String description;
	
	public int getVisitId(){
		
		return this.visitId;
	}
//	public Person getPatientId(){
//		return this.patientId;
//	}
//	public Cdo getCdoId(){
//		return this.cdoId;
//	}
	public String getVisitDescription(){
		return this.description;
	}
	public String getVisitType(){
		return this.visitType;
	}
	
	public void setVisitId(int newVisitId){
		this.visitId = newVisitId;
	}
//	public void setPersonId(Person newPersonId){
//		this.patientId = newPersonId;
//	}
//	public void setCdoId(Cdo newCdoId){
//		this.cdoId = newCdoId;
//	}
	public void setDescription(String newDescription){
		this.description = newDescription;
	}
	public void setVisitType(String newVisitType){
		this.visitType = newVisitType;
	}
}

