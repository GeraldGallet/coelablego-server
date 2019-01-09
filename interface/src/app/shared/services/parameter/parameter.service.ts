import { Injectable } from '@angular/core';
import { Subject, Observable, of} from 'rxjs';
import { map} from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ParameterService{

  color:string;
  banner = environment.assets.bannerVerte;
  colorCodeSubject = new Subject<string>();
  bannerSubject = new Subject<string>();

  palette = [
    {
      name: 'Vert',
      code: '#55B460'
    },
    {
      name: 'Rouge',
      code: '#ED6262'
    },
    {
      name: 'Bleu',
      code: '#353dff'
    },
    {
      name: 'Noir',
      code: '#323232'
    }
  ];

  constructor(){
    this.color = this.initColor();
  }

  setColor(color:string){
    this.color = color;
    this.emitColorCodeSubject();
  }

  setBanner(banner:string){
    this.banner = banner;
    this.emitBanner();
  }

  initColor():string{
    let localStorageItem = localStorage.getItem('color');
    return localStorageItem ==null ? '#55B460' : localStorageItem;
  }

  emitColorCodeSubject() {
    if (this.color ==='#55B460'){
      this.colorCodeSubject.next(this.color);
    }
    for (let i of this.palette) {
      if (this.color===i.name){
        this.colorCodeSubject.next(i.code);
        this.banner = `banner${i.name}`;
        this.chooseBanner();
        localStorage.setItem('color',i.name);
      }
    }
  }

  emitBanner(){
    this.bannerSubject.next(this.banner);
  }

  chooseBanner(){
    if (this.banner=='bannerBleu'){
      this.setBanner(environment.assets.bannerBleu);
    }
    else if(this.banner=='bannerRouge'){
      this.setBanner(environment.assets.bannerRouge);
    }
    else if(this.banner==='bannerVert'){
      this.setBanner(environment.assets.bannerVerte);
    }
    else if(this.banner==='bannerNoir'){
      this.setBanner(environment.assets.bannerNoire);
    }
  }
}
