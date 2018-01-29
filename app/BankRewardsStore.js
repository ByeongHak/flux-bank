/**
 * 비동기 플럭스
 * waitFor: 스토어 업데이트 순서 
 * BankRewardStore는 BankBalanceStore와 의존적인 관계
 * BankBalanceStore가 업데이트가 완료된후 BankRewardStore가 작업한다.
 */
import AppDispatcher from './AppDispatcher';
import BankBalanceStore from './BankBalanceStore'
import bankConstants from './constants';
import {ReduceStore} from 'flux/utils';

class BankRewardsStore extends ReduceStore {
  getInitialState() {
    return 'Basic';
  }
  reduce(state, action){
    // 이 메서드는 한 스토어가 지정한 다른 스토어의 콜백을 기다린다.
    this.getDispatcher().waitFor([
      BankBalanceStore.getDispatchToken()
    ]);

    if (action.type === bankConstants.DEPOSITED_INTO_ACCOUNT ||
        action.type === bankConstants.WITHDREW_FROM_ACCOUNT ) {
      let balance = BankBalanceStore.getState();
      if (balance < 5000)
        return 'Basic';
      else if (balance < 10000)
        return 'Silver';
      else if (balance < 50000)
        return 'Gold';
      else
        return 'Platinum';
    }
    return state;
  }
}
export default new BankRewardsStore(AppDispatcher);
