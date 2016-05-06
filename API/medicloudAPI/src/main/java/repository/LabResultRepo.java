package repository;

import java.util.List;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import model.LabResult;

@Repository
@Qualifier("LabResultRepo")
public interface LabResultRepo extends CrudRepository<LabResult, String> {
	public List<LabResult> findByPatientId(int patientId);
	public LabResult findByLabResultId(int labResultId);
}
