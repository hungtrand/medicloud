package service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import static org.springframework.web.bind.annotation.RequestMethod.*;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import model.Person;
import model.User;
import provider.MessageResponse;
import provider.SessionIdentifierGenerator;
import repository.User_repo;

@RestController
@RequestMapping("/user")
public class UserService {	
	@Autowired
    private User_repo userRepository;
    
	public UserService() {
		
	}
	
	/*@RequestMapping(method=GET)
	public List<User> users() {
		return userd.getUsers();
	}*/
	
	@RequestMapping(method=GET, value="/username/{username}")
	public User user(@PathVariable("username") String username) {
		User u = userRepository.findByUsername(username);
		
		return u;
	}
	
	@RequestMapping(method=GET, value="/userID/{userID}")
	public User user(@PathVariable("userID") int userID) {
		User u = userRepository.findByUserID(userID);
		
		return u;
	}
	
	@RequestMapping(method=POST, value="/patientSignUp")
	public void user(@RequestBody User patientSignUp) {
		userRepository.save(patientSignUp);
	}

}
