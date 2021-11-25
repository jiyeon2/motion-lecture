import { BaseComponent } from "./item/baseComponent.js";

export class PageComponent extends BaseComponent<HTMLUListElement>{
  constructor() {
    super(document.createElement('ul'));
    this.element.classList.add('page');
    this.element.textContent = 'this is page component';
  }

}