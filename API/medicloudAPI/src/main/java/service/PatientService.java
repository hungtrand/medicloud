package service;

import java.awt.PageAttributes.MediaType;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;


import model.Cdo;
import model.Observation;
import model.Patient;
import model.Person;
import repository.CdoRepo;
import repository.ObservationRepo;
import repository.PatientRepo;
import repository.PersonDao;



@RestController
@RequestMapping(value="/patient")
public class PatientService {
	
	@Autowired
	private CdoRepo cdoRepo;	
	
	@Autowired
	private ObservationRepo obsRepo;
	
	@RequestMapping(value="/api/cdo/{id}", method = RequestMethod.GET)
	public @ResponseBody Cdo getCdoById(@PathVariable("id") int id){
		
		Cdo p = cdoRepo.findByCdoId(id);
		
		return p;
		
	}
	@RequestMapping(value="/api/cdos", method =RequestMethod.GET)
	public Iterable<Cdo> getAllCDO(){
		return cdoRepo.findAll();
	}
	
	@RequestMapping(value="/api/")
	public Observation getAllObservation(){
		return null;
	}

	@Autowired
	private PersonDao personDao;
	
	@RequestMapping(value="/api/observation/{id}", method=RequestMethod.GET)
	public Observation getObservationById(@PathVariable("id") int id){
		Observation tempObs = new Observation();
		
		return obsRepo.findByObsId(id);
	}
	@RequestMapping(value="/api/{id}/obs",method=RequestMethod.POST)
	public void setObservation(@PathVariable("id")int id,@RequestBody Observation newObservation){
		Observation ob = new Observation();
		
//		newObservation.setPersonId(id);
		ob=obsRepo.save(newObservation);
		
		
	}
	@Autowired
	private PatientRepo patientRepo;
	
	@RequestMapping(value="/api/patient/{id}", method=RequestMethod.GET)
	public Patient getAllPatient(@PathVariable("id")int id){
		
		return patientRepo.findByPatientId(id);
	}
	
	
	class helloworld{
	
			public Person tempPerson = new Person();
			public Observation temObs = new Observation();
			public void setPerson(Person p){
				this.tempPerson = p;
			}
			public void setObs(Observation o){
				this.temObs = o;
			}
		
	}
	@RequestMapping(value="/api/getinfo/{id}", method=RequestMethod.GET)
	public helloworld getTesting(@PathVariable("id")int id){
		helloworld hw = new helloworld();
		hw.setPerson(personDao.findByPersonId(id));
		hw.setObs(obsRepo.findByObsId(id));
		return hw;
	}
	
	@RequestMapping(value="/api/cdo", method=RequestMethod.POST)
	public void setCdo(@RequestBody Cdo c){	
		cdoRepo.save(c);
	}
	
	
}