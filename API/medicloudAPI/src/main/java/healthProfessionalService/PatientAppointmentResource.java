package healthProfessionalService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.stereotype.Controller;

import java.util.*;
import java.util.List;

import model.Appointment;
import provider.MessageResponse;
import repository.PatientRepo;
import repository.AppointmentRepo;
import org.jsondoc.core.annotation.Api;
import org.jsondoc.core.annotation.ApiBodyObject;
import org.jsondoc.core.annotation.ApiMethod;
import org.jsondoc.core.annotation.ApiPathParam;

@RestController
@RequestMapping(value="/api/hp/{hpId}/patients")
@Api(name="Patient resoure Services for health professionals", description="Health professional create, update, or cancel appointment.")
public class PatientAppointmentResource {

	@Autowired
	private AppointmentRepo appointmentRepo;
	
	@Autowired
	private PatientRepo patientRepo;
	
	
	//---------------------------------------------------PUT-----------------------------------------
	/**
	 * Hp updates/change patient's requested appointment date.
	 * @return
	 */
	@RequestMapping(value="/{patientId}/appointments/{appointmentId}",method=RequestMethod.PUT)
	@ApiMethod(description="Health professional updates or changes the appointment of an individual patient.")
	public ResponseEntity<?> getADoctorAppointments(
			@ApiPathParam(name="health professoinal id", description="requires Health professional Id")@PathVariable("hpId")int hpId
			,@ApiPathParam(name="patient id", description = "requires patient id")@PathVariable("patientId")int patientId
			,@ApiPathParam(name="appointment id", description="requires appointment id")@PathVariable("appointmentId")int appointmentId
			,@ApiBodyObject@RequestBody Appointment updateAppointment){
		
		List<Appointment> foundPatient = appointmentRepo.findByPatientIdAndHpId(patientId, hpId);
		if(foundPatient==null){
			MessageResponse mr = new MessageResponse();
			mr.success = false;
			mr.error="Not Found: [patientId: " + patientId + " or hpId: " + hpId + "]";
			mr.message="";
			return new ResponseEntity<MessageResponse>(mr, HttpStatus.NOT_FOUND);
		}
		
		Appointment appointment = appointmentRepo.findByAppointmentId(appointmentId);
		if(updateAppointment.getAppointmentDate()!= null){
			appointment.setNewDate(updateAppointment.getAppointmentDate());
		}else{
			appointment.getAppointmentDate();
		}
		if(updateAppointment.getAcceptAppointment()!=false){
			appointment.setAcceptAppointment(updateAppointment.getAcceptAppointment());
		}else{
			appointment.getAcceptAppointment();
		}
		if(updateAppointment.getAppointmentTime()!= null){
			appointment.setNewTime(updateAppointment.getAppointmentTime());
		}else{
			appointment.getAppointmentTime();
		}
		if(updateAppointment.getActive()!=false){
			appointment.setActive(updateAppointment.getActive());
		}else{
			appointment.getActive();
		}
		if(updateAppointment.getEncounterId()!=0){
			appointment.setEncounterId(updateAppointment.getEncounterId());
		}else{
			appointment.getEncounterId();
		}
		if(updateAppointment.getIsEncounter()!=false){
			appointment.setIsEncounter(updateAppointment.getIsEncounter());
		}
		else{
			appointment.getIsEncounter();
		}
		
			appointment = appointmentRepo.save(appointment);
			
		
		
		return new ResponseEntity<Appointment>(appointment, HttpStatus.OK);
	}
	
	/**
	 * HP accepts appointments.
	 * @param patientId
	 * @param hpId
	 * @param appointmentId
	 * @param accept
	 * @return
	 */
	@RequestMapping(value="/{patientId}/appointments/{appointmentId}/acceptAppiontment", method=RequestMethod.PUT)
	@ApiMethod(description="Health professional accepts/declines the appointment that requested from patients.")
	public ResponseEntity<?> setAppointment(
			@ApiPathParam(name="patient id", description="requires patient id")@PathVariable("patientId")int patientId
			,@ApiPathParam(name="health professional id", description="requires health professional id")@PathVariable("hpId")int hpId
			,@ApiPathParam(name="appointment id", description="requires appointment id")@PathVariable("appointmentId")int appointmentId
			,@ApiBodyObject@RequestBody Appointment accept){
		MessageResponse mr = new MessageResponse();
		List<Appointment> foundPatient = appointmentRepo.findByPatientIdAndHpId(patientId, hpId);
		if(foundPatient==null){
		
			mr.success = false;
			mr.error="Not Found: [patientId: " + patientId + " or hpId: " + hpId + "]";
			mr.message = "";
			return new ResponseEntity<MessageResponse>(mr, HttpStatus.NOT_FOUND);
		}
		
		Appointment appointment = appointmentRepo.findByAppointmentId(appointmentId);
		appointment.setAcceptAppointment(accept.getAcceptAppointment());
		mr.success = true;
		mr.error="";
		mr.message="Accept Appointment Success!";
		appointmentRepo.save(appointment);
		return new ResponseEntity<MessageResponse>(mr, HttpStatus.OK);
	}

	/**
	 * Health professional cancel appointment.
	 * @param hpId
	 * @param patientId
	 * @param appointmentId
	 * @return
	 */
	@RequestMapping(value="{patientId}/appointments/{appointmentId}/cancel", method=RequestMethod.PUT)
	@ApiMethod(description="Health professional cancels an appointment.")
	public ResponseEntity<?> deleteAppointment(@ApiPathParam(name="health professional id", description="requires health professional id")@PathVariable("hpId")int hpId
			, @ApiPathParam(name="patient id", description="requires patient id")@PathVariable("patientId")int patientId
			, @ApiPathParam(name="appointment id", description="requires appointment id")@PathVariable("appointmentId")int appointmentId){
		
		List<Appointment> foundPatient = appointmentRepo.findByHpIdAndPatientIdAndAppointmentId(hpId, patientId, appointmentId);
		MessageResponse mr = new MessageResponse();
		if(foundPatient==null){
			mr.success = false;
			mr.error ="Not Found: [patientId: " + patientId + " or hpId: " + hpId + "or appointmentId: " + appointmentId + "]";
			mr.message="";
			return new ResponseEntity<MessageResponse>(mr, HttpStatus.NOT_FOUND);
		}
		Appointment appointment = appointmentRepo.findByAppointmentId(appointmentId);
		appointment.setActive(false);
		mr.success = true;
		mr.error="";
		mr.message="You are successfully canceled this appointment on Date: " + appointment.getAppointmentDate() +" !";
		appointmentRepo.save(appointment);
		return new ResponseEntity<MessageResponse>(mr, HttpStatus.OK);	
		
	}
}
