import { BaseComponent } from "../../component.js";


function extractVideoId(url: string):string {
  if (url.includes('youtu')){
    return url.replace('https://youtu.be/','');
  }
  return url
}

function getYoutubeImbedSrc(url:string):string{
  const videoId = extractVideoId(url);
  return `https://www.youtube.com/embed/${videoId}`;
}

/**
 * 이용자가 유투브 영상 url을 가져오는 경우
 * 1. 주소창 https://www.youtube.com/watch?v=BcbmFxbdsJ0
 * 2. 동영상 url 복사 https://youtu.be/BcbmFxbdsJ0
 */

export class VideoComponent extends BaseComponent<HTMLElement>{
  constructor(title: string, url: string){
    super(`<section class="video">
              <div class="video__player"><iframe class="video__iframe"></iframe></div>
              <h3 class="video__title"></h3>
          </section>`);

    const iframe = this.element.querySelector('.video__iframe')! as HTMLIFrameElement;
    iframe.src = getYoutubeImbedSrc(url); 

    const titleElement = this.element.querySelector('.video__title')! as HTMLHeadingElement;
    titleElement.textContent = title;
  }
}