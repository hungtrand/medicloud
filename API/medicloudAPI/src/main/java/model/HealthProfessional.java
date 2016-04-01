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
	
//<<<<<<< HEAD
//	
//	// Getters
//	public int getPersonId(){
//		return this.person.getPersonId();
//=======
	public void setUser(User user) {
		this.user = user;
//>>>>>>> 6cc86bf898d374e3c75351459e6fd861e4d46dd9
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
	
	
	public static HealthProfessional create(User user) throws Exception {
		HealthProfessional newHP = new HealthProfessional(user);
		
		return newHP;
	}
}
