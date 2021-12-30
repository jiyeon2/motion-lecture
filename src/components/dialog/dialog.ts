import { BaseComponent, Component } from "../component.js";
import { Composable} from "../page/page.js";


type onCloseListener = () => void;
type onSubmitListener = () => void;

// 동적으로 HTML요소 생성하는 컴포넌트이므로 BaseComponent(this.element 가짐)상속
// 다이얼로그 안에 또다른 컴포넌트 담을 수 있으므로 Composable(addChild메서드) 인터페이스를 구현함
// InputDialog.addChild 통해 외부에서 보여줄 컨텐츠 정할 수 있음
// 버튼이 눌렸을때(닫기, 제출)의 동작도 외부에서 setOnCloseListener, setOnSubmitListener 로 받아온다
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

export class UrlInput extends BaseComponent<HTMLElement> {
  title: HTMLInputElement;
  url: HTMLInputElement;
  
  constructor() {
    super(`
    <div class="url-input">
      <label for="title">Title</label>
      <input id="title" />
      <label for="url">Url</label>
      <input id="url" />
    </div>
  `)

  this.title = this.element.querySelector('#title')! as HTMLInputElement;
  this.url = this.element.querySelector('#url')! as HTMLInputElement;
  }
}

export class BodyInput extends BaseComponent<HTMLElement> {
  title: HTMLInputElement;
  body: HTMLInputElement;
  
  constructor() {
    super(`
    <div class="url-input">
      <label for="title">Title</label>
      <input id="title" />
      <label for="body">Body</label>
      <input id="body" />
    </div>
  `)

  this.title = this.element.querySelector('#title')! as HTMLInputElement;
  this.body = this.element.querySelector('#body')! as HTMLInputElement;
  }
}
