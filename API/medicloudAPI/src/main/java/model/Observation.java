package model;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.springframework.beans.factory.annotation.Autowired;


@Entity
@Table(name="observation")
public class Observation {

	public Observation(){
		
	}
	
	@Id
	@GeneratedValue
	@Column(name="obs_id")
	private int obsId=1;
	
	
	
//	@OneToMany(cascade=CascadeType.ALL)
//	@JoinColumn(name="obs_id")
//	private List<Note> note = new ArrayList<Note>();
	
	@OneToMany(cascade=CascadeType.ALL)
	@JoinColumn(name="start_obs_id")
	private List<ActiveCondition> sactiveCondition = new ArrayList<ActiveCondition>();
	
	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name="end_obs_id")
	private List<ActiveCondition> eactiveCondition  = new ArrayList<ActiveCondition>();
	
	@Column(name="encounter_id")
	private int encounterId;
	
	@Column(name="comments")
	private String comments;
	
	@Column(name="creators")
	private String creators;
	
	@Column(name="state")
	private String state;
	
	
	@Column(name="date_changed")
	private String updated;
	
	@Column(name="date_created")
	private String createNew;
	
	public int getObsId(){
		return this.obsId;
	}
	public int getEncounterId(){
		return this.encounterId;
	}
	public String getComments(){
		return this.comments;
	}
	public String getCreator(){
		return this.creators;
	}
	public String getState(){
		return this.state;
	}
	

	
//	public List<Note> getAllNote(){
//		return this.note;
//	}
	
	
	public String getDateChanged(){
		
		
		return this.updated;
		
	
	}
	public String getDateCreated(){
		
		return this.createNew;
	}
	
	public void setObsId(int newObsId){
		this.obsId = newObsId;
	}

	public void setEncounterId(int newEncounterId){
		this.encounterId = newEncounterId;
	}
	public void setComments(String newComments){
		this.comments = newComments;
	}
	
	public void setState(String newState){
		this.state = newState;
	}
	public void setCreators(String newCreator){
		this.creators = newCreator;
	}
	public void setDateCreated(){
		if(this.createNew != null){
			this.createNew = this.createNew;
		}else{
			this.createNew = new SimpleDateFormat("yyyy.MM.dd.HH.mm.ss").format(new Date().getTime());
		}
	}
	public void setDateUpdated(){
		
			this.updated = new SimpleDateFormat("yyyy.MM.dd.HH.mm.ss").format(new Date().getTime());
		
	}


}
