import {Inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { SeoModel } from '../models/seo.model';
import { APP_BASE_HREF } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class SeoService {
  constructor(private meta: Meta, private title: Title, @Inject(APP_BASE_HREF) private baseHref: string) { }
  generateTags(config: SeoModel) {
    config = {
      title: 'Rendertron Seo Angular',
      description:
        'Seo friendly with google rendertron for angular 9 app by fruitylab.fr',
      image: `https://book.fruitylab.fr${this.baseHref}assets/images/angular-seo-starter.jpg`,
      slug: '',
      ...config
    };
    this.title.setTitle(config.title);
    this.meta.updateTag({ name: 'description', content: config.description });

    this.meta.updateTag({ name: 'twitter:card', content: 'summary' });
    this.meta.updateTag({ name: 'twitter:site', content: '@Fruitylab' });
    this.meta.updateTag({ name: 'twitter:title', content: config.title });
    this.meta.updateTag({ name: 'twitter:description', content: config.description });
    this.meta.updateTag({ name: 'twitter:image', content: config.image });

    this.meta.updateTag({ property: 'og:type', content: 'article' });
    this.meta.updateTag({ property: 'og:site_name', content: 'Fruitylab' });
    this.meta.updateTag({ property: 'og:title', content: config.title });
    this.meta.updateTag({ property: 'og:description', content: config.description });
    this.meta.updateTag({ property: 'og:image', content: config.image });
    this.meta.updateTag({ property: 'og:url', content: `https://book.fruitylab.fr/rendertron/${config.slug}` });
  }
}
