package healthProfessionalService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import model.HealthProfessional;
import model.LabResult;
import model.LabTest;
import model.Patient;
import provider.MessageResponse;
import repository.HealthProfessional_repo;
import repository.LabResultRepo;
import repository.LabTest_repo;
import repository.PatientRepo;
import org.jsondoc.core.annotation.*;
@RestController
@RequestMapping(value="/api/hp/{hpId}/patients/{patientId}/lab-results")
@Api(name="Health professional lab result services", description="Health professional views patients' lab results.")
public class PatientLabResultCollection {
	@Autowired
	private PatientRepo patientRepo;
	
	@Autowired
	private HealthProfessional_repo hpRepo;
	
	@Autowired
	private LabTest_repo labTestRepo;
	
	@Autowired
	private LabResultRepo labResultRepo;
	
	@Transactional
	private LabTest saveLabTest(String name, String category, String infermedicaLabId) {
		LabTest labTest = labTestRepo.findByInfermedicaLabId(infermedicaLabId); 
		
		if (labTest == null) {
			labTest = labTestRepo.findByName(name);
		}
		
		if (labTest == null) {
			labTest = LabTest.create(name, category, infermedicaLabId);
			labTest = labTestRepo.save(labTest);
		}

		return labTest;
	}
	
	@Transactional
	private LabResult saveLabResult(LabTest labTest, Patient patient, HealthProfessional hp, String status, String result) {
		LabResult newLabResult = LabResult.create(labTest, patient, hp);
		newLabResult.setStatus(status);
		newLabResult.setResult(result);
				
		return labResultRepo.save(newLabResult);
	}
	
	@RequestMapping(value = "", method = RequestMethod.GET)
	public ResponseEntity<?> getPatientLabResults(@PathVariable("patientId") int patientId) {
		
		Patient patient = patientRepo.findByPatientId(patientId);
		
		List<LabResult> listLabs = patient.getLabResults();
		return new ResponseEntity<List<LabResult>>(listLabs, HttpStatus.OK);
	}
	
	public static class newLabResult {
		public String status;
		public String result;
		public String name;
		public String category;
		public String infermedicaLabId;
	}
	
	@RequestMapping(value = "", method = RequestMethod.POST)
	@Transactional
	public ResponseEntity<?> addLabResult(
			@RequestBody newLabResult requestNewLabForm, 
			@PathVariable("hpId") int hpId,
			@PathVariable("patientId") int patientId) {
		MessageResponse mr = new MessageResponse();
		
		Patient patient = patientRepo.findByPatientId(patientId);
		HealthProfessional hp = hpRepo.findByHpId(hpId);
		
		if (patient == null) {
			mr.error = "Patient not found.";
			return new ResponseEntity<MessageResponse>(mr, HttpStatus.BAD_REQUEST);
		}
		
		if (hp == null) {
			mr.error = "Health Professional not found.";
			return new ResponseEntity<MessageResponse>(mr, HttpStatus.BAD_REQUEST);
		}
		
		LabTest labTest = saveLabTest(requestNewLabForm.name, requestNewLabForm.category, requestNewLabForm.infermedicaLabId);
		labTest = labTestRepo.findByLabTestId(labTest.getLabTestId());
		
		if (labTest == null) {
			mr.error = "Could not save Lab Test";
			return new ResponseEntity<MessageResponse>(mr, HttpStatus.BAD_REQUEST);
		}
		
		LabResult labResult = saveLabResult(labTest, patient, hp, requestNewLabForm.status, requestNewLabForm.result);
		labResult = labResultRepo.findByLabResultId(labResult.getLabResultId());

		return new ResponseEntity<LabResult>(labResult, HttpStatus.OK);
	}
	
	public static class formUpdateLabResult {
		public String status;
		public String result;
	}
	
	@RequestMapping(value="/{labResultId}", method = RequestMethod.PUT)
	@Transactional
	public ResponseEntity<?> updateLabResult(
			@PathVariable("hpId") int hpId,
			@PathVariable("patientId") int patientId,
			@PathVariable("labResultId") int labResultId,
			@RequestBody formUpdateLabResult requestForm) {
		
		MessageResponse mr = new MessageResponse();
		
		Patient patient = patientRepo.findByPatientId(patientId);
		HealthProfessional hp = hpRepo.findByHpId(hpId);
		
		if (patient == null) {
			mr.error = "Patient not found.";
			return new ResponseEntity<MessageResponse>(mr, HttpStatus.BAD_REQUEST);
		}
		
		if (hp == null) {
			mr.error = "Health Professional not found.";
			return new ResponseEntity<MessageResponse>(mr, HttpStatus.BAD_REQUEST);
		}
		
		LabResult dbLabResult = labResultRepo.findByLabResultId(labResultId);
		if (dbLabResult == null) {
			mr.error = "Existing lab result not found. Cannot update.";
			return new ResponseEntity<MessageResponse>(mr, HttpStatus.BAD_REQUEST);
		}
		
		dbLabResult.setStatus(requestForm.status);
		dbLabResult.setResult(requestForm.result);
		
		dbLabResult = labResultRepo.save(dbLabResult);
		
		return new ResponseEntity<LabResult>(dbLabResult, HttpStatus.OK);
	}
}
