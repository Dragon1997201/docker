import axios from 'axios';

const WDATA_REST_API_URL = 'http://localhost:8080/api/hour';

class WdataService {

    getWData(){
        return axios.get(WDATA_REST_API_URL);
        }        
    }


export default new WdataService();


