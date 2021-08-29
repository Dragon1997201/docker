package com.javaapp.service;

import com.javaapp.hoursData.wData;
import com.javaapp.repository.WDataRep;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import javax.transaction.Transactional;
import java.util.List;

@Service
public class wDataService {
    @Autowired
    private final WDataRep wDataRep;

    public wDataService(WDataRep wDataRep){
        this.wDataRep = wDataRep;
    }

    public void createWData(wData wdata){
        wDataRep.save(wdata);
    }

    @Transactional
    @PostConstruct
    public void init() {
        for(int j = 1; j<=31; j++) {
            for (int i = 0; i <= 24; i++) {
                wData wdata = new wData();

                wdata.setHour(i);
                wdata.setTemperature((int) ((30+j*1.1) * Math.sin(Math.toRadians(i * 180 / 24))));
                wdata.setWet(50+(int) ((20+j*1.1) * Math.sin(Math.toRadians(i * 180 / 24))));
                wdata.setPressure(746 + (int) (50 * Math.sin(Math.toRadians(i * 180 / 24))));

                if (j < 10) {
                    wdata.setDaydate("2021-08-0" + (j));
                } else {
                    wdata.setDaydate("2021-08-" + (j));
                }
                wDataRep.save(wdata);
            }
        }
    }
    public List<wData> findAll(){
        return this.wDataRep.findAll();
    }

    public List<wData> findAllByHour(int hour){
        return wDataRep.findAllByHour(hour);
    }
}
