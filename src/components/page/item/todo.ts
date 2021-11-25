import { BaseComponent } from "../../component.js";

export class TodoComponent extends BaseComponent<HTMLElement>{
  constructor(title: string, body: string){
    super(`<section class="todo">
              <p class="todo__title"></p>
              <div class="todo__body">
                <input type="checkbox"><label></label>
              </div>
          </section>`);


    const titleElement = this.element.querySelector('.todo__title')! as HTMLParagraphElement;
    titleElement.textContent = title;

    const bodyElement = this.element.querySelector('.todo__body')! as HTMLDivElement;
    const checkbox = bodyElement.querySelector('input')! as HTMLInputElement;
    checkbox.setAttribute('value', body);
    const label = bodyElement.querySelector('label')! as HTMLLabelElement;
    label.textContent = body;
  }
}