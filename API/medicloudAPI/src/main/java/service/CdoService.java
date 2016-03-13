package service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import model.Cdo;
import repository.CdoRepo;

public class CdoService {
	
	@Autowired
	private CdoRepo cdoRepo;
	/**
	 * Getting resource.
	 * Get individual's CDO information. 
	 * 
	 * @param id - CDO Id 
	 * @return
	 */
	@RequestMapping(value="/api/cdo/{id}", method = RequestMethod.GET)
	public @ResponseBody Cdo getCdoById(@PathVariable("id") int id){
		
		Cdo p = cdoRepo.findByCdoId(id);
		
		return p;
		
	}
	
	/**
	 * 
	 * @return
	 */
	@RequestMapping(value="/api/cdos", method =RequestMethod.GET)
	public Iterable<Cdo> getAllCDO(){
		return cdoRepo.findAll();
	}
}
