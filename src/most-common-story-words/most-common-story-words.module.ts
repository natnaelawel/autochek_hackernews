import { CacheInterceptor, CacheModule, Module } from '@nestjs/common';
import { MostCommonStoryWordsService } from './most-common-story-words.service';
import { MostCommonStoryWordsController } from './most-common-story-words.controller';
import { HttpModule } from '@nestjs/axios';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    HttpModule.register({
      baseURL: 'https://hacker-news.firebaseio.com/v0/',
    }),
    CacheModule.register({ isGlobal: true, ttl: 10 }),
  ],
  controllers: [MostCommonStoryWordsController],
  providers: [
    MostCommonStoryWordsService,
    { provide: APP_INTERCEPTOR, useClass: CacheInterceptor },
  ],
})
export class MostCommonStoryWordsModule {}
