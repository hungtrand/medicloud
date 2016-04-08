package model;

import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Id;
import javax.persistence.GeneratedValue;
import javax.persistence.Column;


@Entity
@Table(name = "lab_test")
public class LabTest {

	public LabTest(){
		
	}
	
	@Id
	@GeneratedValue
	@Column(name="lab_test_id")
	private int labTestId;
	
	@Column(name="infermedica_lab_id")
	private int infermedicaLabId;
	
	@Column(name="name")
	private String name;
	
	@Column(name="category")
	private String category;

	//Getters
	public int getLabTestId(){
		return this.labTestId;
	}
	public int getInfermedicaLabId(){
		return this.infermedicaLabId;
	}
	public String getName(){
		return this.name;
	}
	public String getCategory(){
		return this.category;
	}
	
	//setters
	public void setLabTestId(int newTestId){
		this.labTestId = newTestId;
	}
	public void setInfermedicaLabId(int newInfermedicaId){
		this.infermedicaLabId = newInfermedicaId;
	}
	public void setName(String newName){
		this.name = newName;
	}
	public void setCategory(String newCategory){
		this.category = newCategory;
	}
	
}

