package com.medicloud.org.model;

import java.math.BigInteger;

public class Model {

	private int id;
	private String name;
	public Model(){
		
	}
	public int getId(){
		return this.id;
	}
	public String getName(){
		return this.name;
	}
	
	public void setID(int newID){
		this.id = newID;
	}
	public void setName(String newName){
		this.name= newName;
	}
}
