/**
 * 디스패치
 */

import {Dispatcher} from 'flux';
//표준 플럭스 디스패처를 확장해 모든 이벤트를 발송을 로깅
class AppDispatcher extends Dispatcher{
  dispatch(action = {}) {
    console.log("Dispatched", action);
    super.dispatch(action);
  }
}

export default new AppDispatcher();
