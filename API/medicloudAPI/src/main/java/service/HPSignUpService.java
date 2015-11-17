package service;

import repositories.HPSignUp_repo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import static org.springframework.web.bind.annotation.RequestMethod.*;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import controller.MessageResponse;
import model.HPSignUp;

@RestController
@RequestMapping("/HPSignUp")
public class HPSignUpService {
	@Autowired
	private HPSignUp_repo hpsuRepo;
	
	public HPSignUpService() {
	}
	
	@RequestMapping(method=POST) 
	public MessageResponse createHPSignUp(@RequestBody HPSignUp signup) {
		MessageResponse mr = new MessageResponse();
		
		HPSignUp hpSU  = hpsuRepo.findByEmail(signup.getEmail());
		if (hpSU == null) {
			HPSignUp newHP = HPSignUp.createHPSignUp(signup.getName(), signup.getEmail(), signup.getBusinessName(), signup.getBusinessAddress(), signup.getBusinessPhone());
			hpsuRepo.save(newHP);
			
			mr.success = true;
		} else {
			mr.success = false;
			mr.message = "duplicate";
		}
		
		return mr;
	}
	
	@RequestMapping(value="/verify/{email}/{token}", method=GET)
	public MessageResponse verifyHPSignUp(@PathVariable("email") String email, @PathVariable("token") String token) {
		MessageResponse mr = new MessageResponse();
		
		HPSignUp hp = hpsuRepo.findByEmail(email);
		if (hp == null) {
			mr.success = false;
			mr.message = "eof";
		} else if (hp.getIsVerified()) {
			mr.success = false;
			mr.message = "duplicate";
		} else if(hp.verify(email, token)){
			hpsuRepo.save(hp);
			mr.success = true;
		} else {
			mr.success = false;
			mr.error = "unknown";
		}
		
		return mr;
		
	}
}
