package repository;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import model.HealthProfessional;

@Repository
@Qualifier(value = "HealthProfessional_repo")
public interface HealthProfessional_repo extends CrudRepository<HealthProfessional, String> {
    public HealthProfessional findByHpId(int hpId);
    public HealthProfessional findByUserId(int userId);
}