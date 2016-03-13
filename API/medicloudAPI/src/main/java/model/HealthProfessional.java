package model;
import javax.persistence.CascadeType;
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
@Table(name="health_professional")
public class HealthProfessional {

	public HealthProfessional(){
		
	}
	
	@Id
	@GeneratedValue
	@Column(name="hp_id")
	private int hpId=0;
	
	@Column(name="title")
	private String title;
	
	@Column(name="license")
	private String license;
	
	@OneToOne(cascade=CascadeType.ALL)
	@JoinColumn(name="person_id",insertable=false, updatable=false, referencedColumnName= "person_id")
	private Person person;
	
	@Column(name="person_id")
	private int personId;
	
	
	public int getPersonId(){
		return this.person.getPersonId();
	}
	
	public int getHpId(){
		return this.hpId;
	}
	
	public String getTitle(){
		return this.title;
	}
	
	public String getLicense(){
		return this.license;
	}
	
	public void setPersonId(int newPersonId){
		this.personId = newPersonId;
	}
	
	public void setHpId(int newHpId){
		this.hpId = newHpId;
	}
	
	public void setTitle(String newTitle){
		this.title = newTitle;
	}
	
	public void setLicense(String newLicense){
		this.license = newLicense;
	}
}
