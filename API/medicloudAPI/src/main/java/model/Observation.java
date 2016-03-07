package model;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;



@Entity
@Table(name="observation")
public class Observation {

	public Observation(){
		
	}
	
	@Id
	@Column(name="obs_id")
	@GeneratedValue
	private int obsId = 0;
	
//	@OneToMany(cascade=CascadeType.ALL)
//	@JoinColumn(name="obs_id", insertable = false, nullable = false, updatable = false)
//	private List<Note> note = new ArrayList<Note>();
	
	@Column(name="comments")
	private String text;
	
	@Column(name="creators")
	private String creators;
	
	@Column(name="date_Created")
	private String create;

	
	@Column(name="date_Updated")
	private String update;
	
	@Column(name="state")
	private String state;
	
	public int getObsId(){
		return this.obsId;
	}
	
	public String getDateCreated(){
		return this.create;
	}
	
	
	public void setObsId(int newId){
		this.obsId = newId;
	}
	
	public String getText(){
		return this.text;  
	}
	public void setText(String newText){
		this.text = newText;
	}
	
	public String getCreator(){
		return this.creators;
	}

	public void setState(String newState){
		this.state = newState;
	}
	
	public void setCreator(String newCreatorName){
		this.creators = newCreatorName;
	}
	public void setDateCreated(){
		if(this.create != null){
			this.create = this.create;
		}else{
		
			this.create = new SimpleDateFormat("yyyy.MM.dd.HH.mm.ss").format(new Date().getTime());
		}
		
	}
	
}
