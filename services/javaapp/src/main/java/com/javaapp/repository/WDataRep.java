package com.javaapp.repository;
import com.javaapp.hoursData.wData;
import org.springframework.data.jpa.repository.JpaRepository;
import java.math.BigInteger;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface WDataRep extends JpaRepository<wData, Integer> {

    List<wData> findAllByHour(int hour);

    List<wData> findAll();

    @Query(value = "SELECT * FROM wData r", nativeQuery = true)
    List<wData> SelectTempByHour();

}
