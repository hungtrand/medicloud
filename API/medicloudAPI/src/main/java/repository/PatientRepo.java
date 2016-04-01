package repository;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import model.Patient;

@Repository
@Qualifier(value="PatientRepo")
public interface PatientRepo extends CrudRepository<Patient, String>{

	public Patient findByHpIdAndPatientId(int hpId, int patientId);
	public Patient findByPatientId(int patientId);
	public Iterable<Patient> findByHpId(int hpId);
}
