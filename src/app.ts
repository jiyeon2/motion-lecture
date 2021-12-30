// 지금 프로젝트에서는 웹팩 안쓰고 있고, <script> 태그로 불러오지도 않고 html에서 type="module" 사용하고 있음
// 이 경우 import 할 때 .js 확장자 붙여야 브라우저가 이해할 수 있다고 함
import { Component } from "./components/component.js";
import { InputDialog } from "./components/dialog/dialog.js";
import { MediaSectionInput } from "./components/dialog/input/media-input.js";
import { TextSectionInput } from "./components/dialog/input/text-input.js";
import { ImageComponent } from "./components/page/item/image.js";
import { NoteComponent } from "./components/page/item/note.js";
import { TodoComponent } from "./components/page/item/todo.js";
import { VideoComponent } from "./components/page/item/video.js";
import { Composable, PageComponent, PageItemComponent } from "./components/page/page.js";


class App {
  private readonly page: Component & Composable;
  constructor(appRoot: HTMLElement, dialogRoot: HTMLElement){
    
    // 함수 실행하는데 클래스를 인자로 넘기는게 낯설어서 이해를 잘 못했음(처음에는 인터페이스 넘기는줄)
    // PageItemComponent는 인터페이스가 아니라 클래스임 
    //    ㄴSectionContainerConstructor인터페이스(SectionContainer 인터페이스 구현하는 인스턴스를 리턴함)를 구현함
    // PageItemComponent는 pagecomponent 인스턴스 내에서 addChild 할 때 pageItem 만들때 사용하는 클래스임
    // PageComponent안에서 생성자 써도 상관은 없으나
    // 범용성있는(외부에서 쓰고싶은 생성자 전달하고, 내부에서는 전달받은 생성자 사용하는) 형태로 만드려면 생성자를 전달하면 됨
    this.page = new PageComponent(PageItemComponent);
    // this.page = new PageComponent(DarkPageItemComponent);
    this.page.attachTo(appRoot);

    const imageBtn = document.querySelector('#new-image')! as HTMLButtonElement;
    imageBtn.addEventListener('click', () => {
      const dialog = new InputDialog();
      const inputSection = new MediaSectionInput();
      dialog.addChild(inputSection);
      dialog.attachTo(dialogRoot);


      dialog.setOnCloseListener(() => {
        dialog.removeFrom(dialogRoot);
      })
      dialog.setOnSubmitListener(() => {
        this.page.addChild(new ImageComponent(inputSection.title, inputSection.url));
        dialog.removeFrom(dialogRoot);
      })
    })

    const videoBtn = document.querySelector('#new-video')! as HTMLButtonElement;
    videoBtn.addEventListener('click', () => {
      const dialog = new InputDialog();
      const inputSection = new MediaSectionInput();
      dialog.addChild(inputSection);
      dialog.attachTo(dialogRoot);


      dialog.setOnCloseListener(() => {
        dialog.removeFrom(dialogRoot);
      })
      dialog.setOnSubmitListener(() => {
        this.page.addChild( new VideoComponent(inputSection.title, inputSection.url));
        dialog.removeFrom(dialogRoot);
      })
    })

    const noteBtn = document.querySelector('#new-note')! as HTMLButtonElement;
    noteBtn.addEventListener('click', () => {
      const dialog = new InputDialog();
      const inputSection = new TextSectionInput();
      dialog.addChild(inputSection);
      dialog.attachTo(dialogRoot);


      dialog.setOnCloseListener(() => {
        dialog.removeFrom(dialogRoot);
      })
      dialog.setOnSubmitListener(() => {
        this.page.addChild(new NoteComponent(inputSection.title, inputSection.body));
        dialog.removeFrom(dialogRoot);
      })
   
    })

    const todoBtn = document.querySelector('#new-todo')! as HTMLButtonElement;
    todoBtn.addEventListener('click', () => {
      const dialog = new InputDialog();
      const inputSection = new TextSectionInput();
      dialog.addChild(inputSection);
      dialog.attachTo(dialogRoot);


      dialog.setOnCloseListener(() => {
        dialog.removeFrom(dialogRoot);
      })
      dialog.setOnSubmitListener(() => {
        this.page.addChild(new TodoComponent(inputSection.title, inputSection.body));
        dialog.removeFrom(dialogRoot);
      })
     
    })

  }
}

// index.html에 하드코딩되어 있는 엘리먼트이므로 반드시 존재함
// 변수 뒤 !는 non-null assertion operator
new App(document.querySelector('.document')! as HTMLElement, document.body);