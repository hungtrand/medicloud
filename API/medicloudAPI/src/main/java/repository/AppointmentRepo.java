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
	public List<Appointment> findByPatientIdAndHpId(int patientId, int hpId);
	public List<Appointment> findByHpId(int hpId);
//	public Appointment findByHpIdAndPatientId(int hpId, int patientId);
	public List<Appointment> findByAppointmentDate(String appointmentDate);
	public Appointment findByPatientIdAndAppointmentId(int patientId, int appointmentId);
	public Appointment findByHpIdAndAppointmentTimeAndAppointmentDate(int hpId, String appointmentTime, String appointmentDate);
	public Appointment findByAppointmentTime(String appointmentTime);
	public List<Appointment> findByAppointmentDateAndHpId(String appointmentDate, int hpId);
	public List<Appointment> findByHpIdAndPatientIdAndAppointmentId(int hpId, int patientId, int appointmentId);
	
}
