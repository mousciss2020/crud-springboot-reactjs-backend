import './App.css';
import ListEmployeComponent from "./components/ListEmployeComponent";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import ShowEmployeComponent from "./components/ShowEmployeComponent";

function App() {
  return (
      <Router>
        <Switch>
            <Route exact={true} path="/" component={ListEmployeComponent}/>
            <Route path="/show-employe/:id" component={ShowEmployeComponent}/>
        </Switch>
      </Router>
  );
}

export default App;
