package model;

import java.text.SimpleDateFormat;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import provider.SessionIdentifierGenerator;

@Entity
@Table(name="hp_signup")
public class HPSignUp {
	@GeneratedValue
	@Id
	@Column(name="id")
	private int id;
	
	@Column(name="prefix", nullable=true, length=45)
	private String prefix;
	
	@Column(name="name", nullable=false, length=45)
	private String name;
	
	@Column(name="suffix", nullable=true, length=45)
	private String suffix;
	
	@Column(name="title", nullable=true, length=45)
	private String title;
	
	@Column(name="email", nullable=false,  length=254)
	private String email;
	
	@Column(name="business_name", length=100)
	private String businessName;
	
	@Column(name="business_address", length=100)
	private String businessAddress;
	
	@Column(name="business_phone", length=20)
	private String businessPhone;
	
	@Column(name="verification_key", nullable=false, length=32)
	private String verificationKey;
	
	@Column(name="is_verified", nullable=false)
	private boolean isVerified;
	
	@Column(name="timestamp", nullable=false)
	private String timestamp;
	
	public String getPrefix() {
		return this.prefix;
	}
	
	public String getName() {
		return this.name;
	}
	
	public String getSuffix() {
		return this.suffix;
	}
	
	public String getTitle() {
		return this.title;
	}
	
	public String getEmail() {
		return this.email;
	}
	
	public String getBusinessName() {
		return this.businessName;
	}
	
	public String getBusinessAddress() {
		return this.businessAddress;
	}
	
	public String getBusinessPhone() {
		return this.businessPhone;
	}
	
	public boolean getIsVerified() {
		return this.isVerified;
	}
	
	public String getVerificationKey() {
		return this.verificationKey;
	}
	
	public void setPrefix(String newPrefix) {
		this.prefix = newPrefix;
	}
	
	public void setSuffix(String newSuffix) {
		this.suffix = newSuffix;
	}
	
	public void setTitle(String newTitle) {
		this.title = newTitle;
	}
	
	public boolean verify(String email, String token) {
		if (this.email.equals(email) && this.verificationKey.equals(token)) {
			this.isVerified = true;	
			return true;
		} else {
			return false;
		}
	}
	
	public void changeVerificationKey() {
		this.verificationKey = SessionIdentifierGenerator.nextSessionId();
	}
	
	public static HPSignUp createHPSignUp(String name, String email, String busName, String busAddress, String busPhone) {
		Date dt = new Date();
		SimpleDateFormat sdf = new java.text.SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String currentTime = sdf.format(dt);
		
		HPSignUp newSU = new HPSignUp();
		newSU.name = name;
		newSU.email = email;
		newSU.businessName = busName;
		newSU.businessAddress = busAddress;
		newSU.businessPhone = busPhone;
		newSU.verificationKey = SessionIdentifierGenerator.nextSessionId();
		newSU.isVerified = false;
		newSU.timestamp = currentTime;
		
		return newSU;
	}
}
