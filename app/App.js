/**
 * UI 컴포넌트 View
 * 스토어와 액션을 모두 임포트 
 * (2단계) 플럭스 유틸의 컨테이너 고차 함수 이용
 */
import React, { Component } from 'react';
import { render } from 'react-dom';
import BankBalanceStore from './BankBalanceStore'; //스토어
import BankActions from './BankActions'; //액션
import {Container} from 'flux/utils';


class App extends Component {
  constructor(){
    super(...arguments);
    BankActions.createAccount();
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

App.getStores = () => ([BankBalanceStore]);
App.calculateState = (prevState) => ({balance:BankBalanceStore.getState()});

const AppContainer = Container.create(App);

render(<AppContainer />, document.getElementById('root'));
