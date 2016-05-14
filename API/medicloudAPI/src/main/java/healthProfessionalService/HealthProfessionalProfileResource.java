package healthProfessionalService;

import model.HealthProfessional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.jsondoc.core.annotation.*;
import provider.MessageResponse;
import repository.HealthProfessional_repo;

@RestController
@RequestMapping(value="/api/hp/{hpId}")
@Api(name="Health professional condition resource service", description="Health professional updates a condition of a patient. Active condition is condition that is currently active.")
public class HealthProfessionalProfileResource {
	@Autowired
	private HealthProfessional_repo hpRepo;
	
	@RequestMapping(value = "/profile", method = RequestMethod.GET)
	@ApiMethod(description="Health professional updates/ makes changes on a condition of a patient. ")
	public ResponseEntity<?> getHealthProfessionalProfile(
			@ApiPathParam(name="Health Professional ID", description="requires health professional id.")
			@PathVariable("hpId") int hpId) {
		MessageResponse mr = new MessageResponse();

		HealthProfessional hp = hpRepo.findByHpId(hpId);

		if (hp ==  null) {
			mr.success = false;
			mr.error = "Health Professional Not Found";

			return new ResponseEntity<>(mr, HttpStatus.NOT_FOUND);
		}

		return new ResponseEntity<>(hp, HttpStatus.OK);
	}
}
