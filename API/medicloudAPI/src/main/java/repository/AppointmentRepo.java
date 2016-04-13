package repository;

import java.util.List;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import model.Appointment;
import model.Patient;

@Repository
@Qualifier("AppointmentRepo")
public interface AppointmentRepo extends CrudRepository<Appointment, String>{

	public Appointment findByAppointmentId(int appointmentId);
	public List<Appointment> findByPatientId(int patientId);
//	public Appointment findByPatientIdAndHPId(int patientId, int hpId);
	public Appointment findByHpIdAndPatientId(int hpId, int patientId);
	public Appointment findByAppointmentDate(String appointmentDate);
	public Appointment findByPatientIdAndAppointmentId(int patientId, int appointmentId);
	public Appointment findByHpIdAndAppointmentTimeAndAppointmentDate(int hpId, String appointmentTime, String appointmentDate);
	public Appointment findByAppointmentTime(String appointmentTime);
	
}
