import React, { Component } from 'react';
import logo from './blg.jpg';
import './App.css';
// Import the web3 library
import Web3 from 'web3'

// Material UI
import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

// Import build Artifacts
//eslint-disable-next-line
import tokenArtifacts from './build/contracts/Token.json'
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      token: null, // token contract
      availableAccounts:[],
      defaultAccount:0,
      tokenSymbol:0,
      rate:1,
      tokenBalance:0,
      ethBalance:0,
      amount:0,

    }
  }

componentDidMount() {
this.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"))
if (this.web3.eth.net.isListening()) {
  this.web3.eth.getAccounts().then(accounts=>{
    const defaultAccount = accounts[0]
    for(var i=0;i<accounts.length;i++){
      this.setState({
            availableAccounts:this.state.availableAccounts.concat(
                <MenuItem value={i} key={accounts[i]} primaryText={accounts[i]}></MenuItem>
                )
              })
            }
      this.web3.eth.net.getId().then(netId=>{
        if (netId in tokenArtifacts.networks) {
          const tokenAddress = tokenArtifacts.networks[netId].address
          console.log(tokenAddress)
          const token = new this.web3.eth.Contract(tokenArtifacts.abi,tokenAddress)
          this.setState({token})
          console.log(token)
          this.state.token.methods.symbol().call().then(tokenSymbol=>{
            this.setState({tokenSymbol})
          })
          this.state.token.methods.rate().call().then(rate=>{
            this.setState({rate})
            })
            this.loadEventListeners()
          }
        })
        this.loadAccountBalances(defaultAccount)

      })
    }
  }
  /**
   * Load the accounts token and ether balances.
   * @param  {Address} account The user's ether address.
   */


loadAccountBalances(account) {
if(this.state.token != null){
  this.state.token.methods.balanceOf(account).call((err,balance)=>{
    this.setState({tokenBalance:balance})
  })

this.web3.eth.getBalance(account,(err,ethbalance)=>{
  this.setState({ethBalance:ethbalance})
})
}
}


  // Create listeners for all events.
  loadEventListeners() {
    console.log("EventListener ready")
    this.state.token.events.Transfer ({
  fromBlock: 'latest',
  toBlock: 'latest'
}, function(error, result) {
  if (!error) {
    console.log(result);
  } else {
    console.log(error);
  }
});
    //this.state.token.getPastEvents('Transfer',{fromBlock:0},(err,events)=>{console.log(events)})
  //  this.state.token.events.Transfer({fromBlock:0}).on('data',(err,events)=>{console.log(events)})
//  this.web3.eth.getAccounts().then(accounts=>{
    //console.log(accounts[this.state.defaultAccount])
    //this.loadAccountBalances(accounts[this.state.defaultAccount])
//  })

  }

  // Buy new tokens with eth
  buy(amount) {
    this.web3.eth.getAccounts().then(accounts=>{
      this.state.token.methods.buy().send({from:accounts[this.state.defaultAccount],value:amount},(err,res)=>{
        err?console.error(err):console.log(res)
      })

    })



  }

  // Transfer tokens to a user
  transfer(user, amount) {


  }

  // When a new account in selected in the available accounts drop down.
  handleDropDownChange = (event, index, defaultAccount) => {
    this.setState({defaultAccount})
    this.loadAccountBalances(this.state.availableAccounts[index].key)
  }

  render() {
    let component

    component = <div>
      <h3>Active Account</h3>
      <DropDownMenu maxHeight={300} width={500} value={this.state.defaultAccount} onChange={this.handleDropDownChange}>
        {this.state.availableAccounts}
      </DropDownMenu>
      <h3>Balances</h3>
      <p className="App-intro">{this.state.ethBalance / 1e18} ETH</p>
      <p className="App-intro"> {this.state.tokenBalance} {this.state.tokenSymbol}</p>
      <br />
      <div>
        <h3>Buy Tokens</h3>
        <h5>Rate: {this.state.rate} {this.state.tokenSymbol} / wei</h5>
        <TextField floatingLabelText="Token Amount." style={{width: 200}} value={this.state.amount}
          onChange={(e, amount) => {this.setState({ amount })}}
        />
        <RaisedButton label="Buy" labelPosition="before" primary={true}
          onClick={() => this.buy(this.state.amount/this.state.rate)}
        />
      </div>
      <br />

    </div>

    return (
      <MuiThemeProvider>
        <div className="App">
          <header className="App-header">
            <img src={logo} alt="logo" style={{height: '150px', width: '350px'}}/>
          </header>
          {component}
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
