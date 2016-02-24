package model;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

@Entity
@Table(name="role")
public class Role {

	@Id
	@GeneratedValue
	@Column(name="role_id")
	private int roleId;
	
	@Column(name="description")
	private String description;
	
//	@ManyToMany(cascade= CascadeType.ALL)
//	@JoinTable(name="user_role", joinColumns=@JoinColumn(name="role_id"), inverseJoinColumns=@JoinColumn(name="user_id"))
//	
	
	
	public int getRoleId(){
		return this.roleId;
	}
	public String getDescription(){
		return this.description;
	}
	
	public void setRoleId(int newRowId){
		this.roleId = newRowId;
	}
	public void setDescription(String newDescription){
		this.description = newDescription;
	}
	
}
