package model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="`condition`")
public class Condition {
	
	@Id
	@GeneratedValue
	@Column(name="condition_id")
	private int conditionId=0;
	
	@Column(name="description")
	private String description;
	
	@Column(name="severity")
	private String severity;
	
	@Column(name="infer_c_id")
	private int inferCId;
	
	public int getCondition(){
		return this.conditionId;
	}
	public String getDescription(){
		return this.description;
	}
	public String getSeverity(){
		return this.severity;
	}
	public int getInferCId(){
		return this.inferCId;
	}
	
	public void setConditionId(int newConditionId){
		this.conditionId = newConditionId;
	}
	public void setDescription(String newDescription){
		this.description = newDescription;
	}
	public void setSeverity(String newSeverity){
		this.severity = newSeverity;
	}
	public void setInferCId(int newInferCId){
		this.inferCId = newInferCId;
	}
	

}
