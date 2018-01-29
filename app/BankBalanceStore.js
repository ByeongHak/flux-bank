/**
 * 스토어
 * (1단계)
 * - 소유한 상태를 저장하며 자신을 디스패처에 등록.
 * - 액션이 발송될때마다 모든 스토어가 호출되며 해당 액션과 연관되는지 여부 결정.
 * - 연관되는 경우 스토어는 내부 상태를 변경하고 이벤트를 생성해 스토어가 변경된 것을
 *  뷰에 알림
 * - 이벤트를 내보내기 위해 이벤트 방출기(event emitter)패키지 : fbemitter 설치
 * (2단계) 플럭스 유틸 스토어를 활용
 * - 이벤트 방출기의 인스턴스를 직접 만들 필요가 없다.
 * - 수동으로 스토어를 디스패치에 등록하지 않는다. 대신 스토어의 인스턴스를 생성하고 이를 디스패처에 인수로 전달한다.
 * (3단계)  플럭스 유틸 리듀스스토어(ReduceStore) 활용
 * - 코드를 더 깔끔하게 작성할 수 있는 것은 물론, 기능 기반이 변경 불가 자료구조와 밀접하게 연관돼 있어
 *  리액트 같은 수준 높은 선언적 프로그래미잉 가능하며 테스트 같은 다른 영역에도 긍정적임.
 */
import {ReduceStore} from 'flux/utils';
import AppDispatcher from './AppDispatcher';
import bankConstants from './constants';

let balance = 0;

class BankBalanceStore extends ReduceStore {
  getInitialState(){
    return 0;
  }
  reduce(state, action){
    switch(action.type){
      case bankConstants.CREATED_ACCOUNT:
        return 0;
      case bankConstants.DEPOSITED_INTO_ACCOUNT:
        return state + action.amount;
      case bankConstants.WITHDREW_FROM_ACCOUNT:
        return state - action.amount;
      default:
        return state;
    }
  }
}

export default new BankBalanceStore(AppDispatcher);
