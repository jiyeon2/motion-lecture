import { BaseComponent, Component } from "../component.js";

// pageItem 과 page 둘다 동일한 메서드 가지고 있음 -> 인터페이스로 만들어 구현하도록 한다
export interface Composable {
  addChild(child: Component): void;
}
type OnCloseListener = () => void;
class PageItemComponent extends BaseComponent<HTMLElement> implements Composable{
  private closeListener?: OnCloseListener;
  constructor(){
    super(`
          <li class="page-item">
              <section class="page-item__body"></section>
              <div class="page-item__controls">
                  <button class="close">&times;</button>
              </div>
          </li>
          `);

    const closeBtn = this.element.querySelector('.close')! as HTMLButtonElement;
    closeBtn.onclick = () => {
      this.closeListener && this.closeListener();
    }
  }

  addChild(child: Component){
    const container = this.element.querySelector('.page-item__body')! as HTMLElement;
    child.attachTo(container);
  }
  
  // 보통 이벤트등록 관련 함수는 생성자보다는 별도로 등록하는 함수를 만든다
  // 필요에 의해 추후에 등록될 수 있으므로 인스턴스 생성하는 생성자함수보다 그 후에 유동성있게 추가할 수 있도록
  // 생성자에는 인스턴스를 만들기 위해 반드시 필요한 요소만 인자로 받아오는 것이 좋다
  setOnCloseListener(listener: OnCloseListener) {
    this.closeListener = listener;
  }
}

export class PageComponent extends BaseComponent<HTMLUListElement> implements Composable{
  constructor() {
    // 상속받는 자식 클래스에서는 super 통해 부모클래스의 생성자를 반드시 호출해야함
    super('<ul class="page"></ul>');
  }

  addChild(section: Component){
    const item = new PageItemComponent();
    item.addChild(section);
    item.attachTo(this.element, 'beforeend');

    // 페이지단에서 페이지아이템을 관리하기 위해 페이지아이템 내에서 스스로 remove호출하는 것이 아니라 
    // 전체적으로 관리하고 있는 페이지 컴포넌트에 위임하여 페이지 아이템이 삭제될 때 페이지도 알 수 있도록 함(나중에 드래드 드롭할때 필요)
    item.setOnCloseListener(() => {
      item.removeFrom(this.element);
    })
  }

}