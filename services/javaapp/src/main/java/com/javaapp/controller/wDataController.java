package com.javaapp.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.javaapp.hoursData.wData;
import com.javaapp.repository.WDataRep;
import net.minidev.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("api/")
public class wDataController {
    @Autowired
    private final WDataRep wDataRep;

    public wDataController(WDataRep wDataRep){
        this.wDataRep = wDataRep;
    }


    public void createWData(wData wdata) {
        wDataRep.save(wdata);
    }

    @GetMapping("hour")
    public List<wData> findAll(){
        return wDataRep.findAll();
    }

    @GetMapping("test")
    public List<wData> findAllByHour() {return wDataRep.findAllByHour(3);}
}
