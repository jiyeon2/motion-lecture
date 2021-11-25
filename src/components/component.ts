// baseComponent를 여기저기 전달하기 보다는 interface를 만들어 전달하는 것이 낫다
export interface Component{
  attachTo(parent: HTMLElement, position?: InsertPosition): void;
}

/**
 * Encapsulate the HTML element creation
 */
export class BaseComponent<T extends HTMLElement> implements Component{
  // HTMLElement이거나 상속한 타입만 element로 사용 가능
  // BaseComponent 상속한 클래스 내부에서만 접근 가능하도록 protected
  protected readonly element: T;

  constructor(htmlString: string){
    const template = document.createElement('template');
    template.innerHTML = htmlString;

    this.element = template.content.firstElementChild! as T;
  }

  attachTo(parent:HTMLElement, position: InsertPosition = 'afterbegin'):void {
    parent.insertAdjacentElement(position, this.element);
  }
}