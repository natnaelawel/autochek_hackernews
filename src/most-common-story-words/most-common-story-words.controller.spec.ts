import { Test, TestingModule } from '@nestjs/testing';
import { MostCommonStoryWordsController } from './most-common-story-words.controller';
import { MostCommonStoryWordsService } from './most-common-story-words.service';

describe('MostCommonStoryWordsController', () => {
  let controller: MostCommonStoryWordsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MostCommonStoryWordsController],
      providers: [MostCommonStoryWordsService],
    }).compile();

    controller = module.get<MostCommonStoryWordsController>(MostCommonStoryWordsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
