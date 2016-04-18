package model;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

@Entity
@Table(name="`condition`")
public class Condition {
	
	@Id
	@GeneratedValue
	@Column(name="condition_id")
	private int conditionId=0;
	
	@Column(name="name")
	private String name;
	
	@Column(name="infer_c_id")
	private String inferCId;
	
	public Condition() {
		
	}
	
	//Getters 
	/**
	 * Get Condition id which is primary key. 
	 * @return - Condition id.
	 */
	public int getConditionId(){
		return this.conditionId;
	}
	
	public String getName(){
		return this.name;
	}
	public String getInferCId(){
		return this.inferCId;
	}
	
	//Setters
	/**
	 * Set a new Condition name
	 * @param newName - Condition name
	 */
	public void setName(String newName){
		this.name = newName;
	}
	
	public void setConditionId(int newConditionId){
		this.conditionId = newConditionId;
	}
	

	public void setInferCId(String newInferCId){
		this.inferCId = newInferCId;
	}

	public static Condition create(String name, String inferCId) {
		Condition newCond = new Condition();
		newCond.name = name;
		newCond.inferCId = inferCId;
		
		return newCond;
	}
	

}
