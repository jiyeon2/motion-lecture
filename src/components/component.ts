// baseComponent를 여기저기 전달하기 보다는 interface를 만들어 전달하는 것이 낫다

// element 멤버변수의 경우 해당 클래스의 내부에서만 사용함 
// Component인터페이스 이용자들이 element에 직접 접근하여 사용하지 않으므로 
// interface 에는 명시하지 않음으로써 캡슐화
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