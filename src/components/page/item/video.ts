import { BaseComponent } from "../../component.js";


export class VideoComponent extends BaseComponent<HTMLElement>{
  constructor(title: string, url: string){
    super(`<section class="video">
              <div class="video__player"><iframe class="video__iframe"></iframe></div>
              <h3 class="video__title"></h3>
          </section>`);

    const iframe = this.element.querySelector('.video__iframe')! as HTMLIFrameElement;
    iframe.src = this.convertToEmbeddedURL(url); 

    const titleElement = this.element.querySelector('.video__title')! as HTMLHeadingElement;
    titleElement.textContent = title;
  }

  /**
   * 이용자가 유투브 영상 url을 가져오는 경우 embed url로 변환하여 리턴
   * input
   * 1. 주소창 https://www.youtube.com/watch?v=BcbmFxbdsJ0
   * 2. 동영상 url 복사 https://youtu.be/BcbmFxbdsJ0
   * 
   * output https://www.youtube.com/embed/BcbmFxbdsJ0
   * 
   * 
   * 정규표현식 https://regexr.com/5l6nr
   */
  private convertToEmbeddedURL(url: string):string {

    const regExp = /^(?:https?:\/\/)?(?:www\.)?(?:(?:youtube.com\/(?:(?:watch\?v=)|(?:embed\/))([a-zA-Z0-9(-|_)]{11}))|(?:youtu.be\/([a-zA-Z0-9(-|_)]{11})))/;
    const match = url.match(regExp);
    const videoId = match ? match[1] || match[2] : undefined;
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return url;
  }
}