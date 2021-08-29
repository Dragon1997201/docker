import React from 'react';
import WdataService from '../services/WdataService';
import ReactEcharts from 'echarts-for-react';

class EchartComponent extends React.Component {

    constructor(props, context) {
        super(props, context);
        var someDate = new Date();
        //someDate.setDate(someDate.getDate());
        this.state = {
            graphOptionWet: {
                xAxis: {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: [],
                    type: 'line',
                    smooth: true
                }]
            },
            graphOptionTemperature: {
                xAxis: {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: [],
                    type: 'line',
                    smooth: true
                }]
            },
            graphOptionPressure: {
                xAxis: {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: [],
                    type: 'line',
                    smooth: true
                }]
            },
            hours:[1,2,3,4],
            date: someDate,
            hourFrom: 0,
            hourTo: 24
        }
        console.log(this.state.date);
        //var date = someDate.setDate(someDate.getDate()); 
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSel1Change = this.handleSel1Change.bind(this);
        this.handleSel2Change = this.handleSel2Change.bind(this);
        this.handleSelSubmit = this.handleSelSubmit.bind(this);
        this.hourSet = Array(24).fill().map((e,i) => i);
        console.log(this.hourSet);
        this.hourrs=this.hourSet.map(h=><option>{h}</option>);
    }

    
    componentDidMount(){

        WdataService.getWData().then((response) => {
            this.setState({
                //hours: response.data.filter(h=>h.hour),
                hours: this.hourSet,
                graphOptionTemperature: {
                    xAxis: {
                        data: this.hourSet,
                        name: "Hours"
                    },
                    series: [{
                        data: response.data.map(x=>x.temperature),
                    }]
                },
                graphOptionWet: {
                    xAxis: {
                        data: this.hourSet,
                        name: "Hours"
                    },
                    series: [{
                        data: response.data.map(x=>x.wet),
                    }]
                },
                graphOptionPressure: {
                    xAxis: {
                        data: this.hourSet,
                        name: "Hours"
                    },
                    series: [{
                        data: response.data.map(x=>x.pressure),
                    }]
                }
            })
        });
        
        console.log(this.state.graphOptionWet);
        console.log(this.state.hours.map(x=>x.wet));
    }

    handleChange(event) { this.setState({date: event.target.value});  }

    handleSel1Change(event) { this.setState({hourFrom: event.target.value}); }
    handleSel2Change(event) { this.setState({hourTo: event.target.value}); }

    handleSubmit(event) {
        console.log('Your date is: ' + this.state.date);
        event.preventDefault();

        WdataService.getWData().then((response) => {
            this.setState({
                graphOptionTemperature: {
                    xAxis: {
                        data: this.hourSet,
                    },
                    series: [{
                        data: response.data.filter(dat=> dat.daydate===this.state.date).map(x=>x.temperature),
                    }]
                },
                graphOptionWet: {
                    xAxis: {
                        data: this.hourSet
                    },
                    series: [{
                        data: response.data.filter(dat=> dat.daydate===this.state.date).map(x=>x.wet),
                    }]
                },
                graphOptionPressure: {
                    xAxis: {
                        data: this.hourSet
                    },
                    series: [{
                        data: response.data.filter(dat=> dat.daydate===this.state.date).map(x=>x.pressure),
                    }]
                }
             })
            });   
        }
    handleSelSubmit(event) {
        console.log("date",this.state.date);
        event.preventDefault();
        var d = Math.abs(this.state.hourTo-this.state.hourFrom)+1;
        var from = Math.min(this.state.hourFrom,this.state.hourTo);
        var daydat = this.state.date;
        console.log(typeof daydat);
        if (typeof daydat == 'object'){
        var mon = this.state.date.getMonth();
        if(mon < 10){
            mon = '0'+mon;
        }
        daydat = this.state.date.getFullYear()+'-'+mon+'-'+this.state.date.getDate();
        }
        
        console.log("daydat", daydat);
        var hourSets = Array(d).fill().map((e,i) => i+Number(from));
        console.log(hourSets);
        WdataService.getWData().then((response) => {
            this.setState({
                graphOptionTemperature: {
                    xAxis: {
                        data: hourSets,
                    },
                    yAxis: {
                        type: 'value',
                    },
                    series: [{
                        //data: response.data.filter(dat=> dat.daydate===this.state.date).map(x=>x.temperature),
                        data: response.data.filter(dat=> dat.daydate===daydat).filter(h=>h.hour>=hourSets[0]).map(x=>x.temperature),
                    }]
                },
                graphOptionWet: {
                    xAxis: {
                        data: hourSets
                    },
                    series: [{
                        data: response.data.filter(dat=> dat.daydate===daydat).filter(h=>h.hour>=hourSets[0]).map(x=>x.wet),
                    }]
                },
                graphOptionPressure: {
                    xAxis: {
                        data: hourSets
                    },
                    series: [{
                        data: response.data.filter(dat=> dat.daydate===daydat).filter(h=>h.hour>=hourSets[0]).map(x=>x.pressure),
                    }]
                }
             })
            });   

    }

    render (){
        return (
            <div>
                <h1 className = "text-center">Weather data</h1>
                
                <form onSubmit={this.handleSubmit}>
                    <label>Date: </label>
                <input type="date" defaultValue={this.state.date} onChange={this.handleChange}></input>
                <button type="submit">Ok</button>
                </form>
            <br/>
                <form onSubmit={this.handleSelSubmit}>
                    <label>Hours from: </label>
                <select onChange={this.handleSel1Change} >
                    {this.hourSet.map(
                        h=>
                        <option>{h+1}</option>
                    )}
                </select>
                    <label> to: </label>
                <select onChange={this.handleSel2Change} >
                    {this.hourSet.map(
                        h=>
                        <option>{h+1}</option>
                    )}
                </select>
                <button type="submit" >Ok</button>
                    </form>

                <h5>Temperature</h5>
                <ReactEcharts
                        style={{height: '30vh', width: '50vw', margin: 'auto'}}
                        ref={(e) => {
                            this.echartsReactRef = e;
                        }}
                        option={this.state.graphOptionTemperature}
                    />
                    <h5>Wet</h5>
                    <ReactEcharts
                        style={{height: '30vh', width: '50vw', margin: 'auto'}}
                        ref={(e) => {
                            this.echartsReactRef = e;
                        }}
                        option={this.state.graphOptionWet}
                    />
                    <h5>Pressure</h5>
                    <ReactEcharts
                        style={{height: '30vh', width: '50vw', margin: 'auto'}}
                        ref={(e) => {
                            this.echartsReactRef = e;
                        }}
                        option={this.state.graphOptionPressure}
                    />
                   
                            
            </div>
            
        )
    }

    componentWillMount(){
        console.log(this.state.hours)
    }
}

export default EchartComponent


