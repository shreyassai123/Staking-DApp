import React from "react"
import { RewardAbi, RewardAddress, StakeAbi, StakeAddress, MplRewardsAbi, MplRewardsAddress } from "../constants";
const Web3 = require("web3");
const web3 = new Web3("https://ropsten.infura.io/v3/7a83a1ed33ff4bedae09b00782de9a3f")



export default class StakeApp extends React.Component {
    
    constructor(props) {
      super(props);
      this.state = { 
          text: '' , 
          rewBal:0,
          stkBal:0,
          earned:0,
        };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleConnect = this.handleConnect.bind(this);
      this.handleGetReward = this.handleGetReward.bind(this);
      
      
    }

    ethEnabled = async () => {
        if (window.ethereum) {
          await window.ethereum.send('eth_requestAccounts');
          window.web3 = new Web3(window.ethereum);
          return true;
        }
        return false;
      }
    updateData = async() => {
        var accounts = await window.web3.eth.getAccounts()
            this.setState(state => ({test:'Test'}))
            var RewardContract = new web3.eth.Contract(RewardAbi, RewardAddress)
          RewardContract.methods.balanceOf(accounts[0]).call(function (err, res) {
            if (err) {
              console.log("An error occured", err)
              return
            }
            this.setState(state => ({rewBal: res}))
          }.bind(this))
          this.setState(state => ({test:'Test'}))
          var StakeContract = new web3.eth.Contract(RewardAbi, RewardAddress)
        StakeContract.methods.balanceOf(accounts[0]).call(function (err, res) {
          if (err) {
            console.log("An error occured", err)
            return
          }
          this.setState(state => ({stkBal: res}))
        }.bind(this))

        var MplRewardsContract = new web3.eth.Contract(MplRewardsAbi, MplRewardsAddress)
        MplRewardsContract.methods.earned(accounts[0]).call(function (err, res) {
            if (err) {
              console.log("An error occured", err)
              return
            }
            this.setState(state => ({earned: res}))
          }.bind(this))
    }
    
  
    render() {
      return (
        <div>
            
          <h2>Staking</h2>

          <button onClick={this.handleConnect}>
              Connect
            </button>
            
            <h4>Reward Token Balance: {this.state.rewBal} REW</h4> 
            <h4>Staking Token Balance: {this.state.stkBal} STK</h4> 

            <h5>Earned: {this.state.earned}</h5>

          <div>
            <label htmlFor="new-todo" style={{
                paddingRight: '20px',
                boxSizing: 'content-box',


            }}>
              Get Rewards 
            </label>
            <button onClick={this.handleGetReward}>
                Get Rewards
            </button>
            </div>
          
            <label htmlFor="new-todo" style={{
                paddingRight: '20px',
                boxSizing: 'content-box',
            }}>
              Stake 
            </label>
            <input
              id="new-todo"
              onChange={this.handleChange}
              type="number"
              value={this.state.text}
            />
            <button onClick={this.handleSubmit}>
              Stake
            </button>
            
        </div>
      );
    }

    async handleGetReward(e){
        var MplRewardsContract = new web3.eth.Contract(MplRewardsAbi, MplRewardsAddress)
        MplRewardsContract.methods.getReward().call(function (err, res) {
            if (err) {
              console.log("An error occured", err)
              return
            }
          }.bind(this))
    }

   async handleConnect(e){
        var check = await this.ethEnabled()
        if(!check){ 
            alert('Metaask not installed')

        } else {
            this.updateData()

        }
    }
  
    handleChange(e) {
      this.setState({ text: e.target.value });
    }
  
    handleSubmit(e) {
        var MplRewardsContract = new web3.eth.Contract(MplRewardsAbi, MplRewardsAddress)
        MplRewardsContract.methods.stake(this.state.text).call(function (err, res) {
            if (err) {
              console.log("An error occured", err)
              return
            }
            console.log('STUFF '+ res)
          }.bind(this))
    }
  }
  
 
