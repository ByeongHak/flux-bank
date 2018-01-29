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
      amount: 0
    });
  },
  /**
   * @param  {number} amount 입금할 금액
   */
  depositIntoAccount(amount) {
    AppDispatcher.dispatch({
      type: bankConstants.DEPOSITED_INTO_ACCOUNT,
      amount: amount
    });
  },
  /**
   * @param  {number} amount 출금할 금액
   */
  withdrawFromAccount(amount) {
    AppDispatcher.dispatch({
      type: bankConstants.WITHDREW_FROM_ACCOUNT,
      amount: amount
    });
  }

};
export default BankActions;

