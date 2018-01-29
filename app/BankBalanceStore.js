/**
 * 스토어
 * (1단계)
 * - 소유한 상태를 저장하며 자신을 디스패처에 등록.
 * - 액션이 발송될때마다 모든 스토어가 호출되며 해당 액션과 연관되는지 여부 결정.
 * - 연관되는 경우 스토어는 내부 상태를 변경하고 이벤트를 생성해 스토어가 변경된 것을
 *  뷰에 알림
 * - 이벤트를 내보내기 위해 이벤트 방출기(event emitter)패키지 : fbemitter 설치
 * (2단계) 플럭스 유틸 스토어를 활용
 *  - 이벤트 방출기의 인스턴스를 직접 만들 필요가 없다.
 *  - 수동으로 스토어를 디스패치에 등록하지 않는다. 대신 스토어의 인스턴스를 생성하고 이를 디스패처에 인수로 전달한다.
 */
import {Store} from 'flux/utils';
import AppDispatcher from './AppDispatcher';
import bankConstants from './constants';

let balance = 0;

class BankBalanceStore extends Store {
  getState(){
    return balance;
  }

  __onDispatch(action){
    switch(action.type){
      case bankConstants.CREATED_ACCOUNT:
        balance = 0;
        this.__emitChange();
        break;
      case bankConstants.DEPOSITED_INTO_ACCOUNT:
        balance =   balance + action.ammount;
        this.__emitChange();
        break;
      case bankConstants.WITHDREW_FROM_ACCOUNT:
        balance = balance - action.ammount;
        this.__emitChange();
        break;
    }
  }
}

export default new BankBalanceStore(AppDispatcher);
