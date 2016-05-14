package healthProfessionalService;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import org.jsondoc.core.annotation.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ser.FilterProvider;
import com.fasterxml.jackson.databind.ser.impl.SimpleBeanPropertyFilter;
import com.fasterxml.jackson.databind.ser.impl.SimpleFilterProvider;

import model.Appointment;
import model.Patient;
import model.Prescription;
import model.User;
import provider.MessageResponse;
import repository.AppointmentRepo;
import repository.HealthProfessional_repo;
import repository.PatientRepo;
import repository.PrescriptionRepo;
import repository.User_repo;
@RestController
@RequestMapping(value="/api/hp/{hpId}/patients/{patientId}")
@Api(name="Health professional resource services", description="Health professional views or creates new appointments or write prescription to individual patient.")
public class PatientResource {
	
	@Autowired
	PatientRepo patientRepo;
	
	@Autowired
	PrescriptionRepo prescriptionRepo;
	
	@Autowired
	HealthProfessional_repo hpRepo;

	@Autowired
	AppointmentRepo appointmentRepo;
	
	@Autowired
	User_repo userRepo;
	
	/**
	 * This method is to use for HP to look at patient.
	 * @param hpId
	 * @param patientId
	 * @return
	 */
	@RequestMapping(value="", method = RequestMethod.GET)
	@ApiMethod(description="Health professional views individual patient's information.")
	public ResponseEntity<?> getPatient(
			@ApiPathParam(name="health professional id", description="requires health professional id")@PathVariable("hpId") int hpId
			, @ApiPathParam(name="patient id", description="requires patient id")@PathVariable("patientId") int patientId 
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
	@ApiMethod(description="Health professional views a patinet's prescription that he/she provided previously.")
	public ResponseEntity<?> getAPatientPrescription(@ApiPathParam(name="health professional id", description="requires health professional id")@PathVariable("hpId")int hpId
			, @ApiPathParam(name="patient id", description="requires patient id")@PathVariable("patientId")int patientId){
		
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
	@ApiMethod(description="health professional creates/writes new prescription to an individual patient.")
	public ResponseEntity<?> setPatientPrescription(
			@ApiPathParam(name="health professional id", description="requries health professional id")@PathVariable("hpId")int hpId
			, @ApiPathParam(name="patient id", description="requires patient id")@PathVariable("patientId")int patientId
			, @ApiBodyObject@RequestBody Prescription newPrescription){
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
	@ApiMethod(description="Health professional creates news appointments with an individual patient.")
	public void setAppointment(@ApiPathParam(name="patient id", description="requires patient id")@PathVariable("patientId")int patientId	
			, @ApiPathParam(name="health professional id", description="requires health professional id")@PathVariable("hpId")int hpId
			, @ApiBodyObject@RequestBody Appointment newAppointment){
		
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
	@ApiMethod(description="Health professional changes/updates the prescription of an individual patient that prescripted by him/her.")
	public ResponseEntity<?> updatePatientPrescription(@ApiPathParam(name="health professional id", description="requres health professional id")@PathVariable("hpId")int hpId
			, @ApiPathParam(name="patient id", description="requies patient id")@PathVariable("patientId")int patientId
			, @ApiPathParam(name="prescription id", description="requires prescription id")@PathVariable("prescriptionId")int prescriptionId
			, @ApiBodyObject@RequestBody Prescription updatePrescription){
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
	
	private static class patientShareCode {
		public int shareCode;
	}
	
	@Transactional
	private void generate(Patient patient) {
		patient.setShareCode();
		patientRepo.save(patient);
	}
	
	/**
	 * Generate share code.
	 * @param personId
	 * @return
	 */
	@RequestMapping(value="/share-code", method=RequestMethod.PUT)
	@ApiMethod(description="Health professional generates an share code.")
	public ResponseEntity<?> setInvitationCode(@PathVariable("patientId")int patientId,
			@PathVariable("hpId")int hpId) {

		Patient findPatient = patientRepo.findByHpIdAndPatientId(hpId, patientId);
		
		if(findPatient==null){
			MessageResponse mr = new MessageResponse();
			mr.success = false;
			mr.error ="Not found: patientID [ " + patientId + " ] or Health professional Id [ " + hpId + "] ";
			mr.message = "";
			return new ResponseEntity<MessageResponse>(mr, HttpStatus.NOT_FOUND);
		}

		this.generate(findPatient);
		patientShareCode code = new patientShareCode();
		code.shareCode = findPatient.getShareCode();
		return new ResponseEntity<>(code, HttpStatus.OK);
	}

	
	/**
	 * get Generated share code.
	 * @param personId
	 * @return
	 */

	@RequestMapping(value="/share-code", method=RequestMethod.GET)
	@ApiMethod(description="Get current share code.")
	public ResponseEntity<?> getInvitationCode(@ApiPathParam(name="patient id")@PathVariable("patientId")int patientId,
			@ApiPathParam(name="Health professional id")@PathVariable("hpId")int hpId) {

		Patient findPatient = patientRepo.findByHpIdAndPatientId(hpId, patientId);

		if(findPatient==null){
			MessageResponse mr = new MessageResponse();
			mr.success = false;
			mr.error ="Not found: personId [ " + patientId + " ] or health professional ID [ " + hpId + "]";
			mr.message = "";
			return new ResponseEntity<>(mr, HttpStatus.NOT_FOUND);
		}

		
		patientShareCode code = new patientShareCode();
		code.shareCode = findPatient.getShareCode();

		return new ResponseEntity<>(code, HttpStatus.OK);
	}
	
}
