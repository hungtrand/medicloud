package service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import model.HealthProfessional;
import model.Person;
import model.User;
import provider.MessageResponse;
import repository.HealthProfessional_repo;
import repository.User_repo;

@RestController
@RequestMapping(value="/signin")
public class signinService {
	@Autowired
	private User_repo userRepo;
	@Autowired
	private HealthProfessional_repo hpRepo;
	
	public static class signinForm {
		public String username;
		public String password;
		public signinForm() {}
	}
	
	@RequestMapping(value={ "/", "" }, method=RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<?> signin(@RequestBody signinForm form) {
		
		System.out.println("******* Signing in... *******\n" + form.username);
		System.out.println("\n\n*********" + form.password + "********\n");
		MessageResponse mr = new MessageResponse();
		mr.error = "Invalid credentials";
		mr.success = false;
		
		User u = userRepo.findByUsername(form.username);
		
		if (u == null) {
			return new ResponseEntity<MessageResponse>(mr, HttpStatus.UNAUTHORIZED);
		}
		
		System.out.println("\n\n" + u.getPassword());
		if (BCrypt.hashpw(form.password, u.getSalt()).equals(u.getPassword())) {
			if (u.getRole().getDescription().equals("ROLE_HP")) {
				HealthProfessional hp = hpRepo.findByUserId(u.getUserId());
				if (hp == null) {
					mr.error = "User signed up as health professional, but health professional profile does not exists in the database.";
					return new ResponseEntity<MessageResponse>(mr, HttpStatus.UNPROCESSABLE_ENTITY);
				} else {
					return new ResponseEntity<HealthProfessional>(hp, HttpStatus.OK);
				}
			} else if (u.getRole().getDescription().equals("ROLE_PATIENT")) {
				Person p = u.getPerson();
				
				return new ResponseEntity<Person>(p, HttpStatus.OK);
			} else {
				return new ResponseEntity<MessageResponse>(mr, HttpStatus.UNPROCESSABLE_ENTITY);
			}
		} else {
			return new ResponseEntity<MessageResponse>(mr, HttpStatus.UNAUTHORIZED);
		}
	}
}
