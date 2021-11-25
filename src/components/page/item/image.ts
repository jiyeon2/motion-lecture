
export class ImageComponent {
  private element: HTMLElement;

  constructor(title: string, url: string){
    // <template> 태그
    const template = document.createElement('template');

    // 사용자에게 입력받는 string을 innerHTML안에 템플릿 스트링으로 삽입하는 것은 위험하다 스크립트 태그를 삽입할 수도 있기 때문(XSS attack 보안문제)
    // 사용자에게 입력받는 input의 경우 innerHTML보다는 textContent사용하기!!!
    // 아래처럼 요소를 찾아서 필요한 부분만 업데이트 하는 편이 안전함
    template.innerHTML = `
    <section class="image">
        <div class="image__holder"><img class="image__thumbnail"></div>
        <p class="image__title"></p>
    </section>`;

    this.element = template.content.firstElementChild! as HTMLElement; // template.innerHTML에 직접 쓴거라 null이 아님 & HTMLElement가 확실하므로 타입어서션 사용

    const imageElement = this.element.querySelector('.image__thumbnail')! as HTMLImageElement;
    imageElement.setAttribute('src', url);
    imageElement.setAttribute('alt', title);

    const titleElement = this.element.querySelector('.image__title')! as HTMLParagraphElement;
    titleElement.textContent = title;

  }
  attachTo(parent:HTMLElement, position: InsertPosition = 'afterbegin'):void {
    parent.insertAdjacentElement(position, this.element);
  }
}