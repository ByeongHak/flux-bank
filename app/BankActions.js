/**
 * 액션생성자
 * - 타입과 선택적 페이로드를 포함하는 객체 : 액션 생성자
 */
import AppDispatcher from './AppDispatcher';
import bankConstants from './constants';

let BankActions = {
  /**
   * 빈 값으로 계좌를 개설
   */
  createAccount() {
    AppDispatcher.dispatch({
      type: bankConstants.CREATED_ACCOUNT,
      ammount: 0
    });
  },
  /**
   * @param  {number} ammount 입금할 금액
   */
  depositIntoAccount(ammount) {
    AppDispatcher.dispatch({
      type: bankConstants.DEPOSITED_INTO_ACCOUNT,
      ammount: ammount
    });
  },
  /**
   * @param  {number} ammount 출금할 금액
   */
  withdrawFromAccount(ammount) {
    AppDispatcher.dispatch({
      type: bankConstants.WITHDREW_FROM_ACCOUNT,
      ammount: ammount
    });
  }

};
export default BankActions;

