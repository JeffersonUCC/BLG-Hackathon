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
export class error extends Component {
render() {
    return (
      <section id="main">
        <div class="inner">

          <section id="one" class="wrapper style1">

            <div class="image fit flush">
              <img src="images/hands.jpg" alt="" />
            </div>

            <header class="special">
              <h2>Sorry DiaMonde® doesn't have this diamond recorded in our database.</h2>
              <h2>We will be add your stone soon! We promise!!</h2>
            </header>

          </section>
        </div>
      </section>
    );
  }
}
export default withRouter(error);
