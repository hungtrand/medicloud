package model;

import javax.management.relation.Role;
import javax.persistence.Embeddable;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Embeddable
@Table(name="user_role")
public class User_Role {
	
	@OneToOne (targetEntity=User.class)
	@JoinColumn (name="user_id", referencedColumnName="user_id")
	private int user_id;
	
	@ManyToOne (targetEntity=Role.class)
	@JoinColumn (name="role_id", referencedColumnName="role_id")
	private int role_id;
}
