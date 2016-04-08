
/**
 * Collection of hps, health histories
 * @author keon_win8
 *
 */
package patientService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import repository.PatientRepo;

import model.Patient;

@RestController
@RequestMapping(value="")
public class PatientPersonalCollectionServices {

	@Autowired
	private PatientRepo patientRepo;
	
	
	
}
