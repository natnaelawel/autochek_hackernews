import {
  CacheInterceptor,
  Controller,
  Get,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { MostCommonStoryWordsService } from './most-common-story-words.service';

@Controller('most-common-story-words')
@UseInterceptors(CacheInterceptor)
export class MostCommonStoryWordsController {
  constructor(
    private readonly mostCommonStoryWordsService: MostCommonStoryWordsService,
  ) {}

  @Get()
  findAll(@Query('top') top: number, @Query('last') last: number) {
    return this.mostCommonStoryWordsService.findAll(top, last);
  }

  @Get('top-10-last-time')
  findTop10LastWeekStory(
    @Query('top') top: number,
    @Query('time') time: string,
  ) {
    return this.mostCommonStoryWordsService.findTop10LastWeekStory(top, time);
  }
  @Get('top-10-stories-with-user-with-min-karma')
  findTop10StoryWithUserWithMinKarma(
    @Query('minKarma') minKarma: number,
    @Query('top') top: number,
  ) {
    return this.mostCommonStoryWordsService.findTop10StoryWithUserWithMinKarma(
      top,
      minKarma,
    );
  }
}
