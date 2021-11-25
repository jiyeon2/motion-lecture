import { BaseComponent } from "../component.js";

export class PageComponent extends BaseComponent<HTMLUListElement>{
  constructor() {
    // 상속받는 자식 클래스에서는 super 통해 부모클래스의 생성자를 반드시 호출해야함
    super('<ul class="page">This is Page Component@</ul>');
  }

}