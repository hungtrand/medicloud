package repository;

import java.util.List;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import model.Patient;
import model.Person;

@Repository
@Qualifier(value="PatientRepo")
public interface PatientRepo extends CrudRepository<Patient, String>{

	public Patient findByHpIdAndPatientId(int hpId, int patientId);
	public List<Patient> findByPatientId(int patientId);
	public Patient findByPerson(Person person);
	public List<Patient> findByPersonId(int personId);
	public List<Patient>findByPatientIdAndPersonId(int patientId, int personId);
	public Iterable<Patient> findByHpId(int hpId);
}
