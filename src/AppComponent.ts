import PageComponent from "./PageComponent";

export default class AppComponent {
  app: HTMLElement;
  constructor() { 
      const app = document.createElement('div');
      const pageComp = new PageComponent();
      app.classList.add('app');
      this.app = app;

      this.createHeader();
      this.app.append(pageComp.page);
      this.createFooter();

      document.body.append(this.app);
  }

  createHeader(){
    // 헤더 생성
    const header = document.createElement('header');
    this.app.append(header);
    const title = document.createElement('h1')
    header.append(title);
    title.textContent = 'Motion';

    // 버튼 컨테이너 생성
    const buttonContainer = document.createElement('div');
    header.append(buttonContainer);
    buttonContainer.classList.add('buttons');

    // 버튼 생성
    ['image','video','note','todo'].map(label => {
      const button = document.createElement('button');
      button.classList.add('button',label);
      buttonContainer.append(button);
    });
  }

  createFooter(){
    // 푸터 생성
    const footer = document.createElement('footer');
    footer.textContent = 'ⓒ 2021 jiyeon All rights reserved.'
    this.app.append(footer);
  }
}
