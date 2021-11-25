export default class PageComponent{
  page:HTMLElement;
  constructor(){
    this.page = document.createElement('div');
    this.page.classList.add('page');
    this.page.textContent = 'this is page component';
  }
}