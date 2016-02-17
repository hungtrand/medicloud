package model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="cdo")
public class Cdo {
	public Cdo(){
		
	}
	
	@Id
	@GeneratedValue
	@Column(name="cdo_id")
	private int cdoId = 0;
	
	@Column(name="name")
	private String name;
	
	@Column(name="bussiness_id")
	private int businessID;
	
	public int getCdoID(){
		return this.cdoId;
	}
	public int getBusinessID(){
		return this.businessID;
	}
	public String getName(){
		return this.name;
	}
	
	public void setCdoId(int newCdoID){
		this.cdoId = newCdoID;
	}
	public void setBusinessId(int newBusinessID){
		this.businessID = newBusinessID;
	}
	public void setName(String newName){
		this.name = newName;
	}
	
	
}
