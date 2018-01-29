/**
 * UI 컴포넌트 View
 * 스토어와 액션을 모두 임포트 
 */
import React, { Component } from 'react';
import { render } from 'react-dom';
import BankBalanceStore from './BankBalanceStore'; //스토어
import BankActions from './BankActions'; //액션


class App extends Component {
  constructor(){
    super(...arguments);
    BankActions.createAccount();
    this.state = {
      balance: BankBalanceStore.getState()
    }
  }
  // componetDidMount(), componentWillUnmount()를 이용해 BankBalanceStore의 변경을 수신(구독)하는 작업을 관리
  componentDidMount(){
    this.storeSubscription = BankBalanceStore.addListener(data => this.handleStoreChange(data));
  }

  componentWillUnmount(){
    this.storeSubscription.remove();
  }

  handleStoreChange(){
    this.setState({balance: BankBalanceStore.getState()});
  }

  deposit() {
    BankActions.depositIntoAccount(Number(this.refs.ammount.value));
    this.refs.ammount.value = '';
  }

  withdraw() {
    BankActions.withdrawFromAccount(Number(this.refs.ammount.value));
    this.refs.ammount.value = '';
  }

  render(){
    return (
      <div>
        <header>FluxTrust Bank</header>
        <h1>Your balance is ${(this.state.balance).toFixed(2)}</h1>
        <div className="atm">
          <input type="text" placeholder="Enter Ammount" ref="ammount" />
          <br />
          <button onClick={this.withdraw.bind(this)}>Withdraw</button>
          <button onClick={this.deposit.bind(this)}>Deposit</button>
        </div>
      </div>

    );
  }
}
render(<App/>, document.getElementById('root'));
