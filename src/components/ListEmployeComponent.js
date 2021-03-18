import React, {Fragment} from 'react';
import EmployeService from "../services/EmployeService";

class ListEmployeComponent extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            employes: [],
            name:   '',
            email:  '',
            tel:    '',
            adresse:'',
            employe: ''
        }
        this.handlerGetEmploye.bind(this);
        this.handlerDeleteEmploye.bind(this)
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

    handleSubmit =e=>{
        const name = this.state.name;
        const email = this.state.email;
        const tel = this.state.tel;
        const adresse = this.state.adresse;
        const employe = {name: name, email: email, tel: tel, adresse: adresse};
        if(name!=="" || email!=="" || tel!=="" || adresse!==""){
            EmployeService.createEmployes(employe);
        }

        console.log('employe =>' +JSON.stringify(employe))
    }
    async componentDidMount() {
        await  EmployeService.getAllEmploye().then(resp => {
            this.setState({ employes: resp.data })
        })
    }

    handlerGetEmploye =(id)=>{
        this.props.history.push(`/show-employe/${id}`)
    }

    handlerDeleteEmploye =id=>{
        EmployeService.deleteEmploye(id).then(
            resp =>{this.setState({employes: this.state.employes.filter(employe => employe.id !== id)})}
        )
    }


    modal =()=>{
        return (
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <form onSubmit={this.handleSubmit}>
                            <div className="modal-body">

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
                            </div>
                            <div className="modal-footer">
                                <button type="submit" className="btn btn-primary">Save changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        return (
            <Fragment>
                <div className="container">
                    <div className="row">
                        <div className="col-md-1"></div>
                        <div className="col-md-10 pt-5">
                            <h1 className="text-center">La liste des emplyes</h1>
                            <button className="btn btn-primary" data-toggle="modal"
                                    data-target="#exampleModal">Add Employe</button>

                            <table className="table table-striped table-bordered">
                                <thead className="bg-info text-white">
                                <tr>
                                    <th>Nom & Prenom</th>
                                    <th>Email</th>
                                    <th>Telephone</th>
                                    <th>Adresse</th>
                                    <th>Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    this.state.employes.map(employe =>
                                        <tr key={employe.id}>
                                            <td>{employe.name}</td>
                                            <td>{employe.email}</td>
                                            <td>{employe.tel}</td>
                                            <td>{employe.adresse}</td>
                                            <td>
                                                <button className="btn btn-info btn-sm"
                                                        onClick={()=>this.handlerGetEmploye(employe.id)}>
                                                  Update
                                                </button>
                                                <button className="btn btn-danger btn-sm"
                                                        style={{marginLeft: '10px'}}
                                                        onClick={()=>this.handlerDeleteEmploye(employe.id)}>
                                                    Delete
                                                </button>


                                                <div className="btn-group btn-group-toggle d-none" data-toggle="buttons">
                                                    <label className="btn btn-info btn-sm">
                                                        <input type="radio"

                                                               name="options" id="option1"/> Show
                                                    </label>
                                                    <label className="btn btn-success btn-sm">
                                                        <input type="radio" name="options" id="option2"/> Edite
                                                    </label>
                                                    <label className="btn btn-danger btn-sm">
                                                        <input type="radio" name="options" id="option3"/> Delete
                                                    </label>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                }
                                </tbody>
                            </table>
                        </div>
                        <div className="col-md-1"></div>
                    </div>
                    {this.modal()}
                </div>
            </Fragment>
        );
    }
}
export default ListEmployeComponent;
