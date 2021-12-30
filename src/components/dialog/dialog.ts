import { BaseComponent, Component } from "../component.js";
import { Composable} from "../page/page.js";


type onCloseListener = () => void;
type onSubmitListener = () => void;
export class InputDialog extends BaseComponent<HTMLElement> implements Composable {
  closeListener?: onCloseListener;
  submitListener?: onSubmitListener;
  constructor() {
    super(`
      <dialog class="dialog">
        <div class="dialog__container">
          <button class="close">&times;</button>
          <div id="dialog__body"></div>
          <button class="dialog__submit">ADD</button>
        </div>
      </dialog>
    `);

    const closeBtn = this.element.querySelector('.close')! as HTMLElement;
    // addEventListener : 다수의 이벤트리스너 등록시 등록된 순서대로 실행
    // closeBtn.addEventListener('click', () => {});
    // onclick : 기존에 등록된 리스너 덮어씀, 컴포넌트 내에서 이벤트 등록하는 곳이 한군데면 onclick 사용해도 상관없으나
    // 버튼을 다른곳에서도 사용한다면 addeventlistener사용
    closeBtn.onclick = () => {
      this.closeListener && this.closeListener();
    }
    const submitBtn = this.element.querySelector('.dialog__submit')! as HTMLElement;
    submitBtn.onclick = () => {
      this.submitListener && this.submitListener();
    }
  }

  setOnCloseListener(listener: onCloseListener ){
    this.closeListener = listener;
  }
  setOnSubmitListener(listener: onSubmitListener ){
    this.submitListener = listener;
  }
  addChild(child: Component){
    const body = this.element.querySelector('#dialog__body')! as HTMLElement;
    child.attachTo(body);
  }
}