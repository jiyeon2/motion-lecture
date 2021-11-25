import { BaseComponent } from "../../component.js";

export class VideoComponent extends BaseComponent<HTMLElement>{
  constructor(title: string, url: string){
    super(`<section class="video">
              <div class="video__holder"><iframe class="video__iframe"></iframe></div>
              <p class="video__title"></p>
          </section>`);

    const videoIframeElement = this.element.querySelector('.video__iframe')! as HTMLIFrameElement;
    const videoYoutubeCode = url.replace('https://youtu.be/','');
    videoIframeElement.setAttribute('src', `https://www.youtube.com/embed/${videoYoutubeCode}`);

    const titleElement = this.element.querySelector('.video__title')! as HTMLParagraphElement;
    titleElement.textContent = title;
  }
}