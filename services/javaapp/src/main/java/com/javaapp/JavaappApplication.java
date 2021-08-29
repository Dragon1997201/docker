package com.javaapp;

import com.javaapp.controller.wDataController;
import com.javaapp.service.wDataService;
import com.javaapp.hoursData.wData;
import com.javaapp.repository.WDataRep;
import org.aspectj.bridge.MessageUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;

import java.math.BigInteger;
import java.util.Date;
import java.util.List;
import java.util.logging.Logger;

import static java.lang.Math.sqrt;

@SpringBootApplication
public class JavaappApplication {

    @Autowired
    private wDataService dataService;

    @Autowired
    private wDataController dataController;

    public static void main(String[] args) {
        SpringApplication.run(JavaappApplication.class, args);
    }

    @EventListener(ApplicationReadyEvent.class)
    public void testJpaMethods(){
       for(int j = 1; j<=31; j++) {
            for (int i = 0; i < 24; i++) {
                wData wdata = new wData();

                wdata.setHour(i);
                wdata.setTemperature((30 + (int) (j * 1.2)) - ((int) (0.3666 * ((i - 12) ^ 2))));
                wdata.setWet(50 - (int) ((0.6666) * ((j - 13) ^ 3)));
                wdata.setPressure((746 + (int) (j * 1.2)) + i);
            /*if(i<15){
                wdata.setTemperature(15+(int)(i*1.5));
                wdata.setWet(75-i);
                wdata.setPressure(742+i);
            } else {
                wdata.setTemperature(34-(int) (i*1.5));
                wdata.setWet(75+i);
                wdata.setPressure(742-i);
            }*/
                if (j < 10) {
                    wdata.setDaydate("2021-08-0" + (j));
                } else {
                    wdata.setDaydate("2021-08-" + (j));
                }
                dataService.createWData(wdata);
            }
        }

        List<wData> list = dataController.findAll();
        for (wData w:
                list) {
            dataController.createWData(w);
            //System.out.println(w.getHour());
        }
        dataController.findAll().forEach(it->System.out.println(it));

        //dataService.findAll().forEach(it-> System.out.println(it));
    }

}
