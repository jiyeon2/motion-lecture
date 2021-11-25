export class ImageComponent{
  element:HTMLElement;
  constructor(src: string = 'https://picsum.photos/200'){
    this.element = document.createElement('img');
    this.element.setAttribute('src',src);
  }

  attatchTo(parent: HTMLElement, position: InsertPosition = 'afterbegin'):void {
    parent.insertAdjacentElement(position, this.element);
  }
}