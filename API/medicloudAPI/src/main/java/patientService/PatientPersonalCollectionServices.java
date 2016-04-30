
/**
 * Collection of hps, health histories
 * @author keon_win8
 *
 */
package patientService;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import repository.PatientRepo;
import repository.HealthProfessional_repo;
import model.HealthProfessional;
import model.Patient;
import provider.MessageResponse;

@RestController
@RequestMapping(value="/api/patients/{patientId}")
public class PatientPersonalCollectionServices {

	@Autowired
	private PatientRepo patientRepo;
	
	@Autowired
	private HealthProfessional_repo hpRepo;
	
	
//----------------------------------------------------------------------------------GET--------------------------------------------------------------------------
	public static class HpAndPatient{
		private HealthProfessional hp;
		private Patient patient;
		public HealthProfessional getHp(){
			return this.hp;
		}
		public Patient getPatient(){
			return this.patient;
		}
		public void setHp(HealthProfessional newHP){
			this.hp = newHP;
		}
		public void setPatient(Patient newPatient){
			this.patient = newPatient;
		}
	}
	
	//------------------------------------------------------GET--------------------------------------
	/**
	 * Patient gets individual HealthProfessional information.
	 * @param patientId
	 * @param hpId
	 * @return
	 */
	@RequestMapping(value="/hps/{hpId}", method=RequestMethod.GET)
	public ResponseEntity<?> getAnHp(@PathVariable("patientId")int patientId
			, @PathVariable("hpId")int hpId){
		Patient foundPatient = patientRepo.findByHpIdAndPatientId(hpId, patientId);
		if(foundPatient==null){
			MessageResponse mr = new MessageResponse();
			mr.success = false;
			mr.error = "Not Found: [patientId: " + patientId + " or hpId: " + hpId + "]";
			mr.message = "";
			return new ResponseEntity<MessageResponse>(mr, HttpStatus.NOT_FOUND);
		}else{
			HealthProfessional hp = hpRepo.findByHpId(hpId);
			HpAndPatient result = new HpAndPatient();
			result.setPatient(foundPatient);
			result.setHp(hp);
			
			return new ResponseEntity<HpAndPatient>(result, HttpStatus.OK);
		}	
		
	}
	
	
	@RequestMapping(value="/hps", method=RequestMethod.GET)
	public ResponseEntity<?> getAllHp(@PathVariable("patientId")int patientId){

		List<Patient> foundPatient = patientRepo.findByPatientId(patientId);
		if(foundPatient==null){
			MessageResponse mr = new MessageResponse();
			mr.success = false;
			mr.error= "Not Found: [patientId: " + patientId + "]";
			mr.message = "";
			return new ResponseEntity<MessageResponse>(mr, HttpStatus.NOT_FOUND);
		}else{
			List<HealthProfessional> hp = new ArrayList<HealthProfessional>();
			for(int i=0; i<foundPatient.size(); i++){
				HealthProfessional foundHp = hpRepo.findByHpId(foundPatient.get(i).getHpId());
				hp.add(foundHp);
			}
			return new ResponseEntity<List<HealthProfessional>>(hp, HttpStatus.OK);
		}
	
	}
	
	
	
	
	
}
