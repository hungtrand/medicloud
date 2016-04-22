package repository;

import java.util.List;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import model.Prescription;
@Repository
@Qualifier("PrescriptionRepo")
public interface PrescriptionRepo extends CrudRepository<Prescription, String> {

	public Prescription findByHpId(int hpId);
	public Prescription findByPdId(int pdId);
	public Prescription findByHpIdAndPatientId(int hpId, int patientId);
	public Prescription findByIsActive(boolean checker);
	public List<Prescription> findByPatientId(int patientId);
	
}
