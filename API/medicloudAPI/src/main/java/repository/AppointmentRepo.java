package repository;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import model.Appointment;
import model.Patient;

@Repository
@Qualifier("AppointmentRepo")
public interface AppointmentRepo extends CrudRepository<Appointment, String>{

	public Appointment findByAppointmentId(int appointmentId);
	public Appointment findByPatientId(int patientId);
//	public Appointment findByPatientIdAndHPId(int patientId, int hpId);
	public Patient findByHpIdAndPatientId(int hpId, int patientId);
	public Appointment findByAppointmentDate(String appointmentDate);
	
}
