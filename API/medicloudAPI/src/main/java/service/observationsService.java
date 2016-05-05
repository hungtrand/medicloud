package service;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLEncoder;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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
@Api(name="Observation service", description=" User views observations of a patient.")
@RestController
public class observationsService {
	@Value("${infermedica.appId}")
	private String appId;
	
	@Value("${infermedica.appKey}")
	private String appKey;
	
	@RequestMapping(value="/observations", method=GET)
	public String lookupObservations( 
			@RequestParam(value="keywords") String keywords, 
			@RequestParam(value="gender") String gender) throws UnsupportedEncodingException 
	{
		String sURL = "https://api.infermedica.com/v2/search?phrase=" + URLEncoder.encode(keywords, "UTF-8") + "&sex=" + gender + "&max_results=10"; 
		JsonArray arrObservations = new JsonArray();
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
			arrObservations = root.getAsJsonArray(); //May be an array, may be an object. 

		} catch (MalformedURLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	    
		return arrObservations.toString();
		
	}
}
