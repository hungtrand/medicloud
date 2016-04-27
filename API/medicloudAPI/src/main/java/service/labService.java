package service;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;

@Configuration
@PropertySource("classpath:client-side.properties")
@RestController
public class labService {
	@Value("${infermedica.appId}")
	private String appId;
	
	@Value("${infermedica.appKey}")
	private String appKey;
	
	@RequestMapping(value="/labs", method=GET)
	public String lookupConditions() 
	{
		String sURL = "https://api.infermedica.com/v2/lab_tests"; //just a string
		JsonArray arrConditions = new JsonArray();
	    // Connect to the URL using java's native library
	    URL url;
		try {
			url = new URL(sURL);
			
			HttpURLConnection request;
			
			request = (HttpURLConnection) url.openConnection();
			request.setRequestProperty("app_id", this.appId);
			request.setRequestProperty("app_key", this.appKey);
			request.connect();
			
			// Convert to a JSON object to print data
		    JsonParser jp = new JsonParser(); //from gson
		    JsonElement root;
		    
			root = jp.parse(new InputStreamReader((InputStream) request.getContent()));
			arrConditions = root.getAsJsonArray(); //May be an array, may be an object. 

		} catch (MalformedURLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	    
		return arrConditions.toString();
		
	}
}
