package repository;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import model.Observation;

@Repository
@Qualifier(value="ObservationRepo")
public interface ObservationRepo extends CrudRepository<Observation, String> {
	
	public Observation findByObsId(int obs_id);
//	public Observation findByPersonId(int person);
	

	
}
