export class PageComponent{
  private element: HTMLUListElement; // 섹션 담을 ul 엘리먼트
  constructor() {
    this.element = document.createElement('ul');
    this.element.classList.add('page');
    this.element.textContent = 'this is page component';
  }

  // 외부에서 PageComponent의 인스턴스에 접근하여 사용할 api들

  // 특정 엘리먼트에 이 page 인스턴스를 추가
  attachTo(parent:HTMLElement, position: InsertPosition = 'afterbegin'):void {
    parent.insertAdjacentElement(position, this.element);
  }
}