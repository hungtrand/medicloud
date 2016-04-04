package repository;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import model.Role;

@Repository
@Qualifier (value = "Role_repo")
public interface Role_repo extends CrudRepository<Role, String> {
	public Role findByRoleId(int roleId);
	public Role findByDescription(String roleDescription);
}
