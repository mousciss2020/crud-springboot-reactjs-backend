import axios from "axios";


class EmployeService {

    getAllEmploye =()=>{
      return  axios.get(`/api/employes`)
    }
    createEmployes=(employe)=>{
        axios.post(`/api/employes`, employe);
    }

    getEmploye =id=>{
       return axios.get(`/api/employes/${id}`);
    }
    deleteEmploye =id=>{
        return axios.delete(`/api/employes/${id}`);
    }
}
export default new EmployeService();
