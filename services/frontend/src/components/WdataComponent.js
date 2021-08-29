import React from 'react';
import WdataService from '../services/WdataService';

class WdataComponent extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            hours:[]
        }
    }

    componentDidMount(){
        WdataService.getWData().then((response) => {
            this.setState({ hours: response.data})
        });
    }

    render (){
        return (
            <div>
                <h1 className = "text-center"> Weather Data List</h1>
                <table className = "table table-striped">
                    <thead>
                        <tr>
                            <td> Hour</td>
                            <td> Temperature</td>
                            <td> Wet</td>
                            <td> Pressure</td>
                        </tr>

                    </thead>
                    <tbody>
                        {
                            this.state.hours.map(
                                hour => 
                                <tr key = {hour.id}>
                                     <td> {hour.hour}</td>   
                                     <td> {hour.temperature}</td>   
                                     <td> {hour.wet}</td>   
                                     <td> {hour.pressure}</td>   
                                </tr>
                            )
                        }

                    </tbody>
                </table>
                        
            </div>
            
        )
    }
}

export default WdataComponent


