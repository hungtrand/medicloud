package application;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.web.access.channel.ChannelProcessingFilter;

import repository.User_repo;

@EnableWebSecurity
@Configuration
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
	@Autowired
	private  User_repo userRepo;
	
	@Autowired
	public void configureAuthentication(AuthenticationManagerBuilder authManagerBuilder) throws Exception {
		CustomAuthProvider authProvider = new CustomAuthProvider();
		authManagerBuilder.authenticationProvider(authProvider);
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http
			.addFilterBefore(new SimpleCORSFilter(), ChannelProcessingFilter.class)
			.authorizeRequests()
			.antMatchers("/", "/HPSignup/**", "/signin/**").permitAll()
			.antMatchers(HttpMethod.OPTIONS,"/api/**").permitAll()
	        .antMatchers("/api/hp/**").hasAuthority("ROLE_HP")
	        .antMatchers("/api/patient/**").hasAuthority("ROLE_PATIENT")
	        .anyRequest().fullyAuthenticated()
	        .and()
			.httpBasic()
			.and()
			.csrf().disable();
	}
	
	public class CustomAuthProvider implements AuthenticationProvider {
		
		public CustomAuthProvider() {
			super();
		}

		// API

		@Override
		public Authentication authenticate(final Authentication authentication) throws AuthenticationException {
			final String name = authentication.getName();
			final String password = authentication.getCredentials().toString();
			
			System.out.println("\n\n ******** New Request *********");
			System.out.println(name);
			System.out.println(password);
			System.out.println("\n********************************\n");
			
			model.User u = userRepo.findByUsername(name);
			
			if (u == null) {
				System.out.println("#### not exists ####");
				return null;
			} else if (BCrypt.hashpw(password, u.getSalt()).equals(u.getPassword())) {
				final List<GrantedAuthority> grantedAuths = (List<GrantedAuthority>) u.getAuthorities();
				final UserDetails principal = new User(name, password, grantedAuths);
				final Authentication auth = new UsernamePasswordAuthenticationToken(principal, password, grantedAuths);
				return auth;
			} else {
				return null;
			}
		}

		@Override
		public boolean supports(final Class<?> authentication) {
			return authentication.equals(UsernamePasswordAuthenticationToken.class);
		}

	}


}
