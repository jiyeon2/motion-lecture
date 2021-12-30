// 지금 프로젝트에서는 웹팩 안쓰고 있고, <script> 태그로 불러오지도 않고 html에서 type="module" 사용하고 있음
// 이 경우 import 할 때 .js 확장자 붙여야 브라우저가 이해할 수 있다고 함
import { Component } from "./components/component.js";
import { InputDialog, MediaData, TextData } from "./components/dialog/dialog.js";
import { MediaSectionInput } from "./components/dialog/input/media-input.js";
import { TextSectionInput } from "./components/dialog/input/text-input.js";
import { ImageComponent } from "./components/page/item/image.js";
import { NoteComponent } from "./components/page/item/note.js";
import { TodoComponent } from "./components/page/item/todo.js";
import { VideoComponent } from "./components/page/item/video.js";
import { Composable, PageComponent, PageItemComponent } from "./components/page/page.js";

type InputComponentConstructor<T = (MediaData | TextData) & Component> = {
  new (): T;
}

class App {
  private readonly page: Component & Composable;
  constructor(appRoot: HTMLElement, private dialogRoot: HTMLElement){
    
    // 함수 실행하는데 클래스를 인자로 넘기는게 낯설어서 이해를 잘 못했음(처음에는 인터페이스 넘기는줄)
    // PageItemComponent는 인터페이스가 아니라 클래스임 
    //    ㄴSectionContainerConstructor인터페이스(SectionContainer 인터페이스 구현하는 인스턴스를 리턴함)를 구현함
    // PageItemComponent는 pagecomponent 인스턴스 내에서 addChild 할 때 pageItem 만들때 사용하는 클래스임
    // PageComponent안에서 생성자 써도 상관은 없으나
    // 범용성있는(외부에서 쓰고싶은 생성자 전달하고, 내부에서는 전달받은 생성자 사용하는) 형태로 만드려면 생성자를 전달하면 됨
    this.page = new PageComponent(PageItemComponent);
    // this.page = new PageComponent(DarkPageItemComponent);
    this.page.attachTo(appRoot);

    this.bindElementToDialog<MediaSectionInput>(
      '#new-image', 
      MediaSectionInput, 
      (input: MediaSectionInput) => new ImageComponent(input.title, input.url)
    );
    this.bindElementToDialog<MediaSectionInput>(
      '#new-video', 
      MediaSectionInput, 
      (input: MediaSectionInput) => new VideoComponent(input.title, input.url)
    );
    this.bindElementToDialog<TextSectionInput>(
      '#new-note', 
      TextSectionInput, 
      (input: TextSectionInput) => new NoteComponent(input.title, input.body)
    );
    this.bindElementToDialog<TextSectionInput>(
      '#new-todo', 
      TextSectionInput, 
      (input: TextSectionInput) => new TodoComponent(input.title, input.body)
    );
  }

  // 중복되는 코드가 있는 경우 코드블럭을 함수로 분리한다
  // 값이 바뀌어야 하는 부분만 인자로 받아온다
  // 제네릭으로 SectionInput 받음
  // T extenda A | B : T 는 A 또는 B 타입만 될 수 있다. A, B가 둘다 동일 인터페이스를 구현하고 있다면 T 타입은 해당 인터페이스를 가지고 있다고 확정할 수 있다
  // T = A | B 는 T는 어떤 타입도 받을 수 있는 제네릭 타입인데 이렇게 정의하면 타입 명시되지 않았을때 기본값으로 A|B 가짐

  // bindElementToDialog<T extends MediaSectionInput | TextSectionInput> 와 같이 내부에서 특정 클래스를 사용하면 해당 클래스들로만 커플링됨
  // 클래스가 아닌 인터페이스로 연결한다
  private bindElementToDialog<T extends (MediaData | TextData)& Component>(
      selector: string, 
      InputComponent: InputComponentConstructor<T>, 
      makeSection: (input: T) => Component 
    ) {
    const element = document.querySelector(selector)! as HTMLButtonElement;
    element.addEventListener('click', () => {
      const dialog = new InputDialog();
      const input = new InputComponent();
      dialog.addChild(input);
      dialog.attachTo(this.dialogRoot);


      dialog.setOnCloseListener(() => {
        dialog.removeFrom(this.dialogRoot);
      })
      dialog.setOnSubmitListener(() => {
        const image = makeSection(input);
        this.page.addChild(image);
        dialog.removeFrom(this.dialogRoot);
      })
    })
  }
}

// index.html에 하드코딩되어 있는 엘리먼트이므로 반드시 존재함
// 변수 뒤 !는 non-null assertion operator
new App(document.querySelector('.document')! as HTMLElement, document.body);