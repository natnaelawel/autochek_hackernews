import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MostCommonStoryWordsModule } from './most-common-story-words/most-common-story-words.module';

@Module({
  imports: [ MostCommonStoryWordsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
