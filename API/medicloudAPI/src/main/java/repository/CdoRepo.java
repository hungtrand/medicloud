package repository;

import model.Cdo;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
@Qualifier(value="CdoRepo")
public interface CdoRepo extends CrudRepository<Cdo,String> {
	public Cdo findByCdoId(int cdoId);
	
	
}