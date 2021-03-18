import React from 'react'
import EmployeService from "../services/EmployeService";

class ShowEmployeComponent extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
            name:   '',
            email:  '',
            tel:    '',
            adresse:'',
        }
        this.handleSubmit.bind(this)
    }



    handleChangeName =e=>{
        this.setState({name : e.target.value});
    }
    handleChangeEmail =e=>{
        this.setState({email: e.target.value});
    }
    handleChangeTel =e=>{
        this.setState({tel: e.target.value});
    }
    handleChangeAdresse =e=>{
        this.setState({adresse: e.target.value});
    }

    handleSubmit =()=> {
        const id = this.state.id;
        const name = this.state.name;
        const email = this.state.email;
        const tel = this.state.tel;
        const adresse = this.state.adresse;
        const employe = {id: id, name: name, email: email, tel: tel, adresse: adresse};
        if (name !== "" || email !== "" || tel !== "" || adresse !== "") {
            EmployeService.createEmployes(employe);
            this.props.history.push("/")
        }
    }


       async componentDidMount() {
        await EmployeService.getEmploye(this.state.id).then(resp => {
            let employe = resp.data;
            this.setState({
                name: employe.name,
                email: employe.email,
                tel  : employe.tel,
                adresse: employe.adresse
            });
            console.log("employe=> "+JSON.stringify(this.state.employe))
        })
    }

    render() {
        return (
            <>
                <div className="row">
                    <div className="col-md-4"></div>
                    <div className="col-md-4 pt-5">
                       <div className="card">
                           <div className="card-body">
                               <form onSubmit={this.handleSubmit}>
                                   <div className="form-group d-none">
                                       <input type="text"
                                              value={this.state.id}
                                              className="form-control" placeholder="your name"/>
                                   </div>
                                   <div className="form-group">
                                       <input type="text"
                                              value={this.state.name}
                                              onChange={this.handleChangeName}
                                              className="form-control" placeholder="your name"/>
                                   </div>
                                   <div className="form-group">
                                       <input type="email"
                                              value={this.state.email}
                                              onChange={this.handleChangeEmail}
                                              className="form-control" placeholder="your email"/>
                                   </div>
                                   <div className="form-group">
                                       <input type="text"
                                              value={this.state.tel}
                                              onChange={this.handleChangeTel}
                                              className="form-control" placeholder="your phone number"/>
                                   </div>
                                   <div className="form-group">
                                    <textarea
                                        value={this.state.adresse}
                                        onChange={this.handleChangeAdresse}
                                        className="form-control" rows="3"></textarea>
                                   </div>
                                   <button type="submit" className="btn btn-primary">Save change</button>
                               </form>
                           </div>
                       </div>
                    </div>
                    <div className="col-md-4"></div>
                </div>
            </>
        );
    }
}
export default ShowEmployeComponent;
