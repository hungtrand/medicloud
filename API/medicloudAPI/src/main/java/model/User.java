package model;

import java.security.SecureRandom;
import java.util.Collection;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import provider.SessionIdentifierGenerator;
import repository.PersonDao;

@Entity
@Table(name="user")
public class User implements UserDetails {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue
	@Column(name="user_id")
	private int userId=0;
	
	@Column(name="username", nullable=true, length=45)
	private String username;
	
	@Column(name="password", nullable=true, length=60)
	private String password;
	
	@Column(name="salt", nullable=true, length=60)
	private String salt;
	
	@Column(name="email", nullable=false, length=45)
	private String email;
	
	@Column(name="is_verified", nullable=false)
	private boolean isVerified = false;
	
	@Column(name="verification_key", nullable=true, length=32)
	private String verificationKey;
	
	@OneToOne(targetEntity=Person.class, cascade=CascadeType.ALL)
	@JoinColumn(name="person_id",insertable=false, updatable=false, referencedColumnName= "person_id")
	private Person person;
	
	@Column(name="person_id")
	private int personId;
	
	@Column(name="invitation_code")
	private int invitationCode;
	
	@OneToOne(cascade=CascadeType.ALL)  
    @JoinTable(name="user_role",  
    	joinColumns={@JoinColumn(name="user_id", referencedColumnName="user_id")},  
    	inverseJoinColumns={@JoinColumn(name="role_id", referencedColumnName="role_id")})  
    private Role role; 
	
	public static User create(String username, String email, String password, Person p) throws Exception {
		User user = new User();

        user.setUsername(username);
        user.setEmail(email);
        user.setPassword(password);
        
        return user;
	}
	public User(){
		
	}
	
	@JsonIgnore
	public int getInvitationCode(){
		return this.setInvitationCode();
	}
	
	public int setInvitationCode(){
		SecureRandom random = new SecureRandom();
		int number = random.nextInt(1000000);		
		this.invitationCode = number;
		
		return this.invitationCode;
	}
	
	public void setPersonId(int newPersonId){
		this.personId = newPersonId;
	}
        
	public void setPerson(Person newPerson) {
		this.person = newPerson;
		this.personId = newPerson.getPersonId();
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
	
	@JsonIgnore
	public String getUsername() {
		return this.username;
	}
	
	public void setUsername(String newUsername) {
		this.username = newUsername;
	}
	
	@JsonIgnore
	public String getPassword() {
		return this.password;
	}
	
	@JsonIgnore
	public String getSalt() {
		return this.salt;
	}
	
	public void setPassword(String password) {
		this.salt = BCrypt.gensalt();
		this.password = BCrypt.hashpw(password, this.salt);
	}
	
	public boolean getIsVerified() {
		return this.isVerified;
	}
	
	public void setVerified(boolean isVerified) {
		this.isVerified = isVerified;
	}
	
	public String getVerificationKey() {
		return this.verificationKey;
	}
	
	public void setVerificationKey() {
		this.verificationKey = SessionIdentifierGenerator.nextSessionId();
	}
	
	public String getEmail() {
		return this.email;
	}
	
	public void setUserId(int newUserId){
		this.userId = newUserId;
	}
	
	public boolean isTokenValid(String token) {
		if (this.isVerified) {
			return false;
		} else if (this.verificationKey.equals(token)) {
			return true;
		} else {
			return false;
		}
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
	
	public Role getRole() {
		return this.role;
	}
	
	public void setRole(Role newRole) {
		this.role = newRole;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return AuthorityUtils.createAuthorityList(this.getRole().getDescription());
	}

	@Override
	public boolean isAccountNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isEnabled() {
		
		return this.isVerified;
	}
}
