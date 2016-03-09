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
@Table(name="note")
public class Note {

	@Id
	@Column(name="note_id")
	@GeneratedValue
	private int noteId = 0;
	

	@ManyToOne(cascade=CascadeType.ALL)
	@JoinColumn(name="obs_id", insertable = false, updatable=false)
	private Observation observation;
	
	@Column(name = "obs_id")
	private int obsId;
	
	
	@Column(name="text")
	private String text;
	
	@Column(name="creator")
	private String creator;
	
	@Column(name="date_Created")
	private String create;

	public int getNoteId(){
		return this.noteId;
	}
	
	public String getDateCreated(){
		return this.create;
	}
	
//	public Timestamp setDateCreated(){
//		Date now = new Date();
//		return this.create = new Timestamp(now.getTime());
//	}

	public int getObservationId(){
		return this.observation.getObsId();
	}
	
	public void setNoteId(int newId){
		this.noteId = newId;
	}
	
	public String getText(){
		return this.text;  
	}
	public void setText(String newText){
		this.text = newText;
	}
	
	public String getCreator(){
		return this.creator;
	}
	
	public void setObsId(int newObsId){
		this.obsId = newObsId;
	}
	
	public void setCreator(String newCreatorName){
		this.creator = newCreatorName;
	}
	public void setDateCreated(){
		if(this.create != null){
			this.create = this.create;
		}else{
		
			this.create = new SimpleDateFormat("yyyy.MM.dd.HH.mm.ss").format(new Date().getTime());
		}
		
	}
	
}
