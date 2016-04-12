package repository;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import model.Condition;

@Repository
@Qualifier(value="ConditionRepo")
public interface ConditionRepo extends CrudRepository<Condition, String> {
	public Condition findByConditionId(int conditionId);
	public Condition findByInferCId(String inferCId);
	public Condition findByName(String conditionName);
}
