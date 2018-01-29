/**
 * 스토어
 * - 소유한 상태를 저장하며 자신을 디스패처에 등록.
 * - 액션이 발송될때마다 모든 스토어가 호출되며 해당 액션과 연관되는지 여부 결정.
 * - 연관되는 경우 스토어는 내부 상태를 변경하고 이벤트를 생성해 스토어가 변경된 것을
 *  뷰에 알림
 * - 이벤트를 내보내기 위해 이벤트 방출기(event emitter)패키지 : fbemitter 설치
 */
import {EventEmitter} from 'fbemitter';
import AppDispatcher from './AppDispatcher';
import bankConstants from './constants';

const CHANGE_EVENT = 'change';
let __emitter = new EventEmitter();
let balance = 0;

/**
 * BankBalanceStore의 기본구조
 * 이벤트 방출기 인스턴스를 생성하고 스토어 변경 이벤트를 구독하기 위한
 * addListener 메서드를 제공, 애플리케이션 디스패처를 임포트하며 발송된
 * 모든 액션에 대해 호출되는 콜백을 제공하고 스토어에 등록.
 */
let BankBalanceStore = {
  getState() {
    return balance;
  },
  addListener: (callback) => {
    return __emitter.addListener(CHANGE_EVENT, callback)
  },
};

BankBalanceStore.dispatchToken = AppDispatcher.register((action) => {
  switch(action.type){
    case bankConstants.CREATED_ACCOUNT:
      balance = 0;
      __emitter.emit(CHANGE_EVENT);
      break;
    case bankConstants.DEPOSITED_INTO_ACCOUNT:
      balance =   balance + action.ammount;
      __emitter.emit(CHANGE_EVENT);
      break;
    case bankConstants.WITHDREW_FROM_ACCOUNT:
      balance = balance - action.ammount;
      __emitter.emit(CHANGE_EVENT);
      break;
  }
});

export default BankBalanceStore;
