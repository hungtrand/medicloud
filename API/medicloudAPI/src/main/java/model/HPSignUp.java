package model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="hp_signup")
public class HPSignUp {
	@GeneratedValue
	@Id
	@Column(name="id")
	private int id;
	
	@Column(name="name", nullable=false, length=45)
	private String name;
	
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
	
	public static HPSignUp createHPSignUp(String name, String email, String busName, String busAddress, String busPhone) {
		HPSignUp newSU = new HPSignUp();
		newSU.name = name;
		newSU.email = email;
		newSU.businessName = busName;
		newSU.businessAddress = busAddress;
		newSU.businessPhone = busPhone;
		
		return newSU;
	}
}
