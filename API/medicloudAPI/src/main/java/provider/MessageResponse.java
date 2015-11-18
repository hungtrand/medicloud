package provider;

public class MessageResponse {
	public boolean success;
	public String error;
	public String message;
	
	public MessageResponse() {
		this.success = false;
		this.error = "";
		this.message = "";
	}
}
