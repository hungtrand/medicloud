package service;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonIOException;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.google.gson.JsonSyntaxException;

import model.Condition;
import provider.MessageResponse;
import repository.ConditionRepo;
import org.jsondoc.core.annotation.*;

@Configuration
@PropertySource("classpath:client-side.properties")
@Api(name="Condition service" , description="Get information from infermedica api.")
@RestController
public class conditionsService {
	@Value("${infermedica.appId}")
	private String appId;
	
	@Value("${infermedica.appKey}")
	private String appKey;
	
	@RequestMapping(value="/conditions", method=GET)
	@ApiMethod(description="Medicloud get conditions services from infermedical api.")
	public String lookupConditions() 
	{
		String sURL = "https://api.infermedica.com/v2/conditions"; //just a string
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
