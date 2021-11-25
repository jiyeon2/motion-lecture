// 지금 프로젝트에서는 웹팩 안쓰고 있고, <script> 태그로 불러오지도 않고 html에서 type="module" 사용하고 있음
// 이 경우 import 할 때 .js 확장자 붙여야 브라우저가 이해할 수 있다고 함
import { ImageComponent } from "./components/page/item/image.js";
import { NoteComponent } from "./components/page/item/note.js";
import { TodoComponent } from "./components/page/item/todo.js";
import { VideoComponent } from "./components/page/item/video.js";
import { PageComponent } from "./components/page/page.js";

class App {
  private readonly page: PageComponent;
  constructor(appRoot: HTMLElement){
    this.page = new PageComponent();
    this.page.attachTo(appRoot);

    const image = new ImageComponent('image title','https://picsum.photos/600/300');
    image.attachTo(appRoot, 'beforeend');

    const video = new VideoComponent('video title!@!', 'https://youtu.be/BcbmFxbdsJ0');
    video.attachTo(appRoot, 'beforeend');

    const note = new NoteComponent('note title@!~~~~', '노트 내용입니다~~~');
    note.attachTo(appRoot, 'beforeend');

    const todo = new TodoComponent('todo tile@#@', 'todo 내용~~~');
    todo.attachTo(appRoot, 'beforeend');

  }
}

// index.html에 하드코딩되어 있는 엘리먼트이므로 반드시 존재함
// 변수 뒤 !는 non-null assertion operator
new App(document.querySelector('.document')! as HTMLElement);