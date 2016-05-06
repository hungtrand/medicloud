package repository;

import java.util.List;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import model.LabTest;

@Repository
@Qualifier("LabTest_repo")
public interface LabTest_repo extends CrudRepository<LabTest, String> {
	public LabTest findByLabTestId(int labTestId);
	public LabTest findByName(String labTestName);
	public LabTest findByInfermedicaLabId(String inferLabId);
}
