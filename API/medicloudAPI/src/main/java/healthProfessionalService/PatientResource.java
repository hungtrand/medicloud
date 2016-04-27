package healthProfessionalService;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ser.FilterProvider;
import com.fasterxml.jackson.databind.ser.impl.SimpleBeanPropertyFilter;
import com.fasterxml.jackson.databind.ser.impl.SimpleFilterProvider;

import model.Appointment;
import model.Patient;
import model.Prescription;
import provider.MessageResponse;
import repository.AppointmentRepo;
import repository.HealthProfessional_repo;
import repository.PatientRepo;
import repository.PrescriptionRepo;
@RestController
@RequestMapping(value="/api/hp/{hpId}/patients/{patientId}")
public class PatientResource {
	
	@Autowired
	PatientRepo patientRepo;
	
	@Autowired
	PrescriptionRepo prescriptionRepo;
	
	@Autowired
	HealthProfessional_repo hpRepo;

	@Autowired
	AppointmentRepo appointmentRepo;
	
	/**
	 * This method is to use for HP to look at patient.
	 * @param hpId
	 * @param patientId
	 * @return
	 */
	@RequestMapping(value="", method = RequestMethod.GET)
	public ResponseEntity<?> getPatient(
			@PathVariable("hpId") int hpId
			, @PathVariable("patientId") int patientId 
		) 
	{
		Patient foundPatient =  patientRepo.findByHpIdAndPatientId(hpId, patientId);
		
		if (foundPatient == null) {
			MessageResponse mr = new MessageResponse();
			mr.success = false;
			mr.error ="Not Found: [hpId: " +  hpId + "], [patientId: " + patientId + "]";
			System.out.println(mr.error);
			return new ResponseEntity<MessageResponse>(mr, HttpStatus.NOT_FOUND);
		} else {
			return new ResponseEntity<Patient>(foundPatient, HttpStatus.OK);
		}
	}
	
	

	@RequestMapping(value="/prescriptions", method=RequestMethod.GET)
	public ResponseEntity<?> getAPatientPrescription(@PathVariable("hpId")int hpId
			, @PathVariable("patientId")int patientId){
		
		Prescription foundPatient = prescriptionRepo.findByHpIdAndPatientId(hpId, patientId);

		if(foundPatient == null){
			MessageResponse mr = new MessageResponse();
			mr.success = false;
			mr.error = "Not Found: [hpId: " +  hpId + "], [patientId: " + patientId + "]";
		
			return new ResponseEntity<MessageResponse>(mr, HttpStatus.NOT_FOUND);
		}else{
		
			if(foundPatient.getIsActive() == true){
			
				return new ResponseEntity<Prescription>(foundPatient, HttpStatus.OK);
			}
			return null;
		}
		

	}
	
	
	
	//-----------------------------------------POST-----------------------------------------
	
	/**
	 * This method is to use for writing prescription to a patient.
	 * @param hpId
	 * @param patientId
	 * @param newPrescription
	 * @return
	 */
	@RequestMapping(value="/prescription", method=RequestMethod.POST)
	public ResponseEntity<?> setPatientPrescription(
			@PathVariable("hpId")int hpId
			,@PathVariable("patientId")int patientId
			,@RequestBody Prescription newPrescription){
		Patient foundPatient = patientRepo.findByHpIdAndPatientId(hpId, patientId);
		if(foundPatient==null){
			MessageResponse mr = new MessageResponse();
			mr.success = false;
			mr.error ="Not Found: [hpId: " + hpId + "], [patientId: " + patientId + "]";
			System.out.println(mr.error);
			return new ResponseEntity<MessageResponse>(mr, HttpStatus.NOT_FOUND);
		}else{
		Prescription prescription = new Prescription();
		newPrescription.setHpId(hpId);
		newPrescription.setPatientId(patientId);
		newPrescription.setDateApproved();
		MessageResponse mr = new MessageResponse();
		mr.success = true;
		mr.message = "The information has been saved.";
		prescription = prescriptionRepo.save(newPrescription);
		return new ResponseEntity<MessageResponse>(mr, HttpStatus.OK);
		}
	}
	
	
	/**
	 * Hp requests an Appointment.
	 * @param patientId
	 */
	@RequestMapping(value="/appointment", method=RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public void setAppointment(@PathVariable("patientId")int patientId	
			, @PathVariable("hpId")int hpId
			, @RequestBody Appointment newAppointment){
		
		List<Appointment> temp = new ArrayList<Appointment>();
	
		newAppointment.setRequestDate();
		newAppointment.setHpId(hpId);
		newAppointment.setPatient(patientId);
		newAppointment.setPatientName(patientRepo.findByPatientId(patientId).getFirstName());
		newAppointment.setHPName(hpRepo.findByHpId(hpId).getUser().getPerson().getFirstName());
		Patient foundPatient = patientRepo.findByHpIdAndPatientId(hpId, patientId);
		if(foundPatient == null){
			MessageResponse mr = new MessageResponse();
			mr.success = false;
			mr.error = "HealthProfessional and Patient are not connected.";
			System.out.println(mr.error);
					
		}else{			
			appointmentRepo.save(newAppointment);
		
			
		}
			
	}
	
	//---------------------------------------------------------PUT-----------------------------------
	
	/**
	 * This method is to use for changing prescription if current prescription is not effective with patient.
	 * @param hpId
	 * @param patientId
	 * @param prescriptionId
	 * @param updatePrescription
	 * @return
	 */
	@RequestMapping(value="/prescription/{prescriptionId}", method = RequestMethod.PUT)
	public ResponseEntity<?> updatePatientPrescription(@PathVariable("hpId")int hpId
			, @PathVariable("patientId")int patientId
			, @PathVariable("prescriptionId")int prescriptionId
			, @RequestBody Prescription updatePrescription){
		Prescription prescription = prescriptionRepo.findByPdId(prescriptionId);
		Patient foundPatient = patientRepo.findByHpIdAndPatientId(hpId, patientId);
		if(foundPatient==null){
			MessageResponse mr = new MessageResponse();
			mr.success= false;
			mr.error ="Not Found: [hpId: " + hpId + "], [patientId: " + patientId + "]";
			return new ResponseEntity<MessageResponse>(mr, HttpStatus.NOT_FOUND);
		}else{
			prescription.setDateApproved();
			boolean config = false;
			if(updatePrescription.getDrugName() != null){
				prescription.setDrugName(updatePrescription.getDrugName());
				if(updatePrescription.getDrugType()!= null){
					prescription.setDrugType(updatePrescription.getDrugType());
					if(updatePrescription.getNumberOfRefill() < 0){
						prescription.getNumberOfRefill();
					}else{
						prescription.getNumberOfRefill();
					}
				}else{
					prescription.getDrugType();
				}
			}else{
				prescription.getDrugName();
			}
			
			prescription.setNumberOfRefill(updatePrescription.getNumberOfRefill());
			
			prescriptionRepo.save(prescription);
		}
		MessageResponse mr = new MessageResponse();
		mr.success = true;
		mr.error = null;
		mr.message= "Your information has been saved.";
		return new ResponseEntity<MessageResponse>(mr, HttpStatus.OK);
	}
	
	
	
}
