package model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="person")
public class Person {
	
	@Id
	@Column(name="person_id")
	@GeneratedValue
	private int personId = 0;
	
	@Column(name="first_name")
	private String firstName;
	
	@Column(name="last_name")
	private String lastName;

	public int getPersonId() {
		return personId;
	}

	public void setPersonId(int personId) {
		this.personId = personId;
	}
	
	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	
	@Override
	public String toString(){
		return "Person [pId = " + this.personId + ", PersonName = " + this.firstName + " ]";
	}

<<<<<<< HEAD
=======
	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
>>>>>>> 975c9800cead23fa22accf6c879649e9f56b84c7
	
}


