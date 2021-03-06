import React, { Component } from "react";
import DiaMonde from "../contracts/DiaMonde.json";
import getWeb3 from "../getWeb3";
import "../App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter,

} from "react-router-dom";

export class cut extends Component {

  state = {
    hash:"",

  };

  componentDidMount=async()=>{
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = DiaMonde.networks[networkId];
      const instance = new web3.eth.Contract(DiaMonde.abi,deployedNetwork);
}
submitForm (e) {
    let inputVal = document.getElementById("hash").value;
    alert(inputVal);
		e.preventDefault()
    if(inputVal!=''){
		this.props.history.push('/history');
  }else{
    this.props.history.push('/error')
  }
	}
render() {
    return (
      <section id="main">
        <div class="inner">
          <section id="one" class="wrapper style1">

            <div class="image fit flush">
              <img src="images/hands.jpg" alt="" />
            </div>
            <header class="special">
              <h2>Cutting and Polishing Stage</h2>
            </header>
            <div class="content">
              <form action ="">


                              Cutting Factory Location:<br/>
                            <input type="text" name="loc"></input>
                              <br/><br/>
                              Measurements:<br/>
                            <input type="text" name="mesurements"></input>
                              <br/><br/>

                               Cut Grade:<br/>
                             <input type="text" name="cutgrade"></input>
                              <br/><br/>
                                Polish Grade:<br/>
                              <input type="text" name="polishgrade"></input>
                              <br/><br/>
                              <input type="submit" value="Submit"></input>
                            </form>
            </div>
          </section>
        </div>
      </section>

    );
  }
}
export default withRouter(cut);
