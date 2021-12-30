import { BaseComponent } from "./component";
import { Closable, OnCloseListener } from "./page/page";

export interface Dialog extends Closable{

}

export class DialogComponent extends BaseComponent<HTMLElement> implements Dialog {
  private closeListener?: OnCloseListener;
  constructor(){
    super(`
    <div class="dialog-container">
        <div class="dialog">
            <button class="dialog-close-button">x</button>
            <button>add</button>
        </div>
    </div>
    `);

  const closeButton = this.element.querySelector('.dialog-close-button')! as HTMLButtonElement;
  closeButton.onclick = () => {
    this.closeListener && this.closeListener();
  }

  }

  setOnCloseListener(listener: OnCloseListener) {
    this.closeListener = listener;
  }
}