package repository;

import java.util.Collection;
import java.util.List;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;
import org.springframework.data.repository.CrudRepository;
import model.Encounter;

@Repository
@Qualifier(value="ContactRepo")
public interface EncounterRepo extends CrudRepository<Encounter, String>{


//	public Contact findByEmail(String email);
//	public List<Contact> findByPersonId(Collection<Integer> personId);
//	public Contact findByPhone(String phone);
}
