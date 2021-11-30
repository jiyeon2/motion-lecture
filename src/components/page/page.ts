import { BaseComponent, Component } from "../component.js";

// pageItem 과 page 둘다 동일한 메서드 가지고 있음 -> 인터페이스로 만들어 구현하도록 한다
export interface Composable {
  addChild(child: Component): void;
}

class PageItemComponent extends BaseComponent<HTMLElement> implements Composable{
  constructor(){
    super(`
          <li class="page-item">
              <section class="page-item__body"></section>
              <div class="page-item__controls">
                  <button class="close">&times;</button>
              </div>
          </li>
          `);

    const closeButton = this.element.querySelector('.page-item__controls .close')! as HTMLButtonElement;
    closeButton.addEventListener('click', () => this.element.remove());
  }

  addChild(child: Component){
    const container = this.element.querySelector('.page-item__body')! as HTMLElement;
    child.attachTo(container);
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
  }

}