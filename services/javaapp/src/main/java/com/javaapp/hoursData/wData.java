package com.javaapp.hoursData;

import javax.persistence.*;
import java.math.BigInteger;
import java.util.Date;
import java.util.Objects;


@Entity
@Table(name="hours_table")
public class wData {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column
    private int hour;
    @Column
    private String daydate;
    @Column
    private int temperature;
    @Column
    private int wet;
    @Column
    private int pressure;

    public wData(){
        hour = 3;
        daydate = "2021-03-03";
        temperature = 34;
        wet = 30;
        pressure = 740;
    }
    @Override
    public int hashCode() {
        return Objects.hash(id, hour, temperature, wet, pressure, daydate);
    }
    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setHour(int hour) {
        this.hour = hour;
    }

    public int getHour() {
        return hour;
    }

    public void setDaydate(String daydate) {
        this.daydate = daydate;
    }

    public String getDaydate() {
        return daydate;
    }

    public void setTemperature(int temperature) {
        this.temperature = temperature;
    }

    public int getTemperature() {
        return temperature;
    }

    public void setWet(int wet) {
        this.wet = wet;
    }

    public int getWet() {
        return wet;
    }

    public void setPressure(int pressure) {
        this.pressure = pressure;
    }

    public int getPressure() {
        return pressure;
    }

    @Override
    public String toString() {
        return "WData{" +
                "id=" + id +
                ", hour='" + hour + '\'' +
                ", temperature='" + temperature + '\'' +
                ", wet=" + wet + '\'' +
                ", pressure=" + pressure +
                '}';
    }
}
