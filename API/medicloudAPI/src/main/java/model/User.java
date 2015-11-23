package model;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import org.springframework.security.crypto.bcrypt.*;

@Entity
@Table(name="user")
public class User {
	@Id
	@GeneratedValue
	@Column(name="user_id")
	private int userID;
	
	@Column(name="username", nullable=false, length=45)
	private String username;
	
	@Column(name="password", nullable=false, length=60)
	private String password;
	
	@Column(name="salt", nullable=false, length=60)
	private String salt;
	
	@Column(name="email", nullable=false, length=45)
	private String email;
	
	public static User createUser(String username, String email, String password) throws Exception {
        User user = new User();

        user.setUsername(username);
        user.setEmail(email);
        user.setPassword(password);
        
        return user;
	}
        
	public int getUserID() {
		return this.userID;
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
