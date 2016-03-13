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
	
	@Column(name="severity")
	private String severity;
	
	@Column(name="infer_c_id")
	private int inferCId;
	
	
	
	
	
	
	//Getters 
	/**
	 * Get Condition id which is primary key. 
	 * @return - Condition id.
	 */
	public int getConditionId(){
		return this.conditionId;
	}
	
	/**
	 * Get severity of that condition.
	 * @return - current severity
	 */
	public String getSeverity(){
		return this.severity;
	}
	public String getName(){
		return this.name;
	}
	public int getInferCId(){
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
	
	public void setSeverity(String newSeverity){
		this.severity = newSeverity;
	}
	public void setInferCId(int newInferCId){
		this.inferCId = newInferCId;
	}
	

}
