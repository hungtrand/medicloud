package service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import static org.springframework.web.bind.annotation.RequestMethod.*;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;

import org.springframework.web.bind.annotation.RestController;

import model.Contact;
import model.HPSignUp;
import model.HealthProfessional;
import model.Person;
import model.Role;
import model.User;
import provider.MessageResponse;
import repository.Contact_repo;
import repository.HPSignUp_repo;
import repository.HealthProfessional_repo;
import repository.PersonDao;
import repository.Role_repo;
import repository.User_repo;

@Configuration
@PropertySource("classpath:client-side.properties")
@RestController
@RequestMapping("/HPSignUp")
public class HPSignUpService {
	@Autowired
	private HPSignUp_repo hpsuRepo;
	
	@Autowired
	private User_repo userRepo;
	
	@Autowired
	private PersonDao personRepo;
	
	@Autowired
	private HealthProfessional_repo hpRepo;
	
	@Autowired
	private Contact_repo contactRepo;
	
	@Autowired
	private Role_repo roleRepo;
	
	@Value("${client.root}")
	private String clientRoot;
	
	@Autowired
	private JavaMailSender mailer;
	
	private boolean sendVerificationEmail(HPSignUp hpSU) {
		String vMsg = "Please click on the following link (or copy & paste it to your browser's address bar): \n";
		try {
			vMsg += "http://" + this.clientRoot + "/HPSignUp/#/verification/?email=" 
					+ URLEncoder.encode(hpSU.getEmail(), "UTF-8") 
					+  "&token=" + hpSU.getVerificationKey();
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
			System.out.println("Unsupported Encoding UTF-8");
		}
		
		
		SimpleMailMessage msg = new SimpleMailMessage();
		msg.setFrom("medicloud.sjsu@gmail.com");
		msg.setTo(hpSU.getEmail());
		msg.setCc("medicloud.sjsu@gmail.com");
		msg.setSubject("Verify your Medicloud account.");
		msg.setText(vMsg);
		
		try {
			mailer.send(msg);
			
			return true;
		} catch (MailException ex) {
            // simply log it and go on...
            System.err.println(ex.getMessage());
            System.out.println(ex.getMessage());
            return false;
        }
	}
	
	@RequestMapping(method=POST) 
	public MessageResponse createHPSignUp(@RequestBody HPSignUp signup) 
	{		
		MessageResponse mr = new MessageResponse();
		
		HPSignUp hpSU  = hpsuRepo.findByEmail(signup.getEmail());
		if (hpSU == null) {
			HPSignUp newHP = HPSignUp.createHPSignUp(	signup.getName(), 
														signup.getEmail(), 
														signup.getBusinessName(), 
														signup.getBusinessAddress(), 
														signup.getBusinessPhone()
													);
			
			// send out an email with the token created in createHPSignUp
			if (this.sendVerificationEmail(newHP)) {
				mr.success = true;
				hpsuRepo.save(newHP); // only save if email went through ok
			} else {
				mr.success = false;
				mr.error = "An error occured while sending email.";
			}
		} else {
			mr.success = false;
			mr.message = "duplicate";
		}
		
		return mr;
	}
	
	@RequestMapping(value="/verify/{email}/{token}", method=GET)
	public MessageResponse verifyHPSignUp(
			@PathVariable("email") String email, @PathVariable("token") String token) 
	{
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
	
	/*
	 * helper class: convert the account set up form into this class
	 */
	public static class accountSetupForm {
		public String username;
		public String password;
		public String email;
		
		public accountSetupForm() {}
	}
	
	@Transactional
	@RequestMapping(value="/accountSetup/{email}/{token}", method=POST)
	public MessageResponse setupSecurity(
			@RequestBody accountSetupForm requestForm, 
			@PathVariable("email") String email, @PathVariable("token") String token) throws Exception 
	{
		MessageResponse mr = new MessageResponse();
		
//		Verbose
		System.out.println("################################## NEW USER #################################");
		System.out.println("Username: " + requestForm.username);
		System.out.println("Email: " + requestForm.email);
		System.out.println("Password: " + requestForm.password);
		
		HPSignUp hpSignup = hpsuRepo.findByEmail(email);
		if (userRepo.findByUsername(requestForm.username) instanceof User) {
			mr.success = false;
			mr.message = "duplicate";
			return mr;
		}
		
		if (!hpSignup.verify(email, token)) {
			mr.success = false;
			mr.message = "eof";
			return mr;
		}
		
		/* creating a health professional is a multi-steps process
		 * 1. create a new person
		 * 2. create a new user for that person
		 * 3. create a new health professional for that user
		 * 4. create a new contact (optional)
		 */
		
		String[] nameParts = hpSignup.getName().split(" ", 2);
		String firstName = nameParts[0];
		String lastName = "";
		if (nameParts.length > 1) lastName = nameParts[1];
		
		Person newPerson = Person.create(firstName, lastName);
		newPerson = personRepo.save(newPerson);

		User u = User.create(requestForm.username, requestForm.email, requestForm.password, newPerson);
		u.setPerson(newPerson);
		
		u = userRepo.save(u);
		
		Role hpRole = roleRepo.findByDescription("ROLE_HP");
		if (hpRole == null) {
			hpRole = Role.create("ROLE_HP");
		}
		
		u.setRole(hpRole);
		
		HealthProfessional hp = HealthProfessional.create(u);
		hp.setCdo(hpSignup.getBusinessName());
		
		hpRepo.save(hp);
		
		Contact c = Contact.create(u.getPerson());
		c.setEmail(requestForm.email);
		c.setAddress(hpSignup.getBusinessAddress());
		c.setPhone(hpSignup.getBusinessPhone());
		
		contactRepo.save(c);
		
		hpSignup.changeVerificationKey();
		
		mr.success = true;
		
		return mr;
	}
}
