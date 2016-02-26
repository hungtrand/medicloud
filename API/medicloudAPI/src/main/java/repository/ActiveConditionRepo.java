package repository;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import model.ActiveCondition;


@Repository
@Qualifier(value="ActiveConditionRepo")
public interface ActiveConditionRepo extends CrudRepository<ActiveCondition, String> {

	
}
