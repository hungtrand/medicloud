package model;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinTable;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.JoinColumn;

@Entity
@Table(name="role")
public class Role {

	@Id
	@GeneratedValue
	@Column(name="role_id")
	private int roleId;
	
	@Column(name="description")
	private String description;	
	  
    @OneToMany(cascade=CascadeType.ALL)  
    @JoinTable(name="user_role",  
    joinColumns={@JoinColumn(name="role_id", referencedColumnName="role_id")},  
    inverseJoinColumns={@JoinColumn(name="user_id", referencedColumnName="user_id")})  
    private List<User> userList;
	
	public int getRoleId(){
		return this.roleId;
	}
	
	public String getDescription(){
		return this.description;
	}
	
	public static Role create(String roleDescription) {
		Role newRole = new Role();
		newRole.description = roleDescription;
		
		return newRole;
	}
	
}
