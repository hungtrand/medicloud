package model;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.springframework.beans.factory.annotation.Autowired;

import repository.User_repo;

@Entity
@Table(name="health_professional")
public class HealthProfessional {	
	@Id
	@GeneratedValue
	@Column(name="hp_id")
	private int hpId=0;
	
	@Column(name="title")
	private String title;
	
	@Column(name="license")
	private String license;
	
	@Column(name="cdo")
	private String cdo;
	
	@OneToOne(targetEntity=User.class, cascade=CascadeType.ALL)
	@JoinColumn(name="user_id",insertable=false, updatable=false, referencedColumnName= "user_id")
	private User user;
	
	@Column(name="user_id")
	private int userId;

	public HealthProfessional() {
		
	}
	
	public HealthProfessional(User user) throws Exception{
		this.setUser(user);
	}
	
	public Person getPerson() {
		return this.user.getPerson();
	}
	
	public User getUser() {
		return this.user;
	}
	
	public void setUser(User user) {
		this.user = user;
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
	
	public void setHpId(int newHpId){
		this.hpId = newHpId;
	}
	
	public void setTitle(String newTitle){
		this.title = newTitle;
	}
	
	public void setLicense(String newLicense){
		this.license = newLicense;
	}
	
	public String getCdo() {
		return this.cdo;
	}
	
	public void setCdo(String cdoName) {
		this.cdo = cdoName;
	}
	
	public static HealthProfessional create(User user) throws Exception {
		HealthProfessional newHP = new HealthProfessional(user);
		newHP.userId = user.getUserId();
		
		return newHP;
	}
}
