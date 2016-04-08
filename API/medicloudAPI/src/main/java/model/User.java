package model;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.*;

import repository.PersonDao;

@Entity
@Table(name="user")
public class User {
	@Id
	@GeneratedValue
	@Column(name="user_id")
	private int userId=0;
	
	@Column(name="username", nullable=false, length=45)
	private String username;
	
	@Column(name="password", nullable=false, length=60)
	private String password;
	
	@Column(name="salt", nullable=false, length=60)
	private String salt;
	
	@Column(name="email", nullable=false, length=45)
	private String email;
	
	@ManyToOne(targetEntity=Person.class, cascade=CascadeType.ALL)
	@JoinColumn(name="person_id",insertable= false, updatable= false, referencedColumnName= "person_id")
	private Person person;
	
	@Column(name="person_id")
	private int personId;
	
	
	
	@Autowired
	private static PersonDao personRepo;
	
	public static User create(String username, String email, String password, Person newPerson) throws Exception {
        newPerson = personRepo.findByPersonId(newPerson.getPersonId());
        if (newPerson == null) throw new Exception("Cannot create user. Person not found in the database.");
        
		User user = new User();

        user.setUsername(username);
        user.setEmail(email);
        user.setPassword(password);
        user.setPerson(newPerson);
        
        return user;
	}
	public User(){
		
	}
	
	
	
	public void setPersonId(int newPersonId){
		this.personId = newPersonId;
	}
        
	public void setPerson(Person newPerson) {
		this.person = newPerson;
	}
	
	public Person getPerson() {
		return this.person;
	}

	
	public int getPersonId(){
		return this.person.getPersonId();
	}
	public int getUserId() {
		return this.userId;
	}
	
	public String getUsername() {
		return this.username;
	}
	
	public void setUsername(String newUsername) throws Exception {
		if (newUsername.length() < 6) {
			throw new Exception("Invalid username format.");
		}
		
		this.username = newUsername;
	}
	
	public String getPassword() {
		return this.password;
	}
	
	public void setPassword(String password) throws Exception {
		if (password.length() < 6) {
			throw new Exception("Password is too weak.");
		}
		
		this.salt = BCrypt.gensalt();
		this.password = BCrypt.hashpw(password, this.salt);
	}
	
	public String getEmail() {
		return this.email;
	}
	public void setUserId(int newUserId){
		this.userId = newUserId;
	}
	public void setEmail(String email) throws Exception {
		String regexEmailPat = "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@" + "[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$";
		Pattern emailPat = Pattern.compile(regexEmailPat);
		Matcher matcher = emailPat.matcher(email);
		if (!matcher.matches()) {
			throw new Exception("Invalid Email.");
		} else {
			this.email = email;
		}
	}
}
