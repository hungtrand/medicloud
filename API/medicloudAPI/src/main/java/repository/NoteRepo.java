package repository;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import model.Note;

@Repository
@Qualifier("NoteRepo")
public interface NoteRepo extends CrudRepository<Note, String>{
	public Note findByCreator(String creator);
	public  Note findByNoteId(int noteId); 
	}