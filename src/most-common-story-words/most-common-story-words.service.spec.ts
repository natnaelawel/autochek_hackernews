import { Test, TestingModule } from '@nestjs/testing';
import { MostCommonStoryWordsService } from './most-common-story-words.service';

describe('MostCommonStoryWordsService', () => {
  let service: MostCommonStoryWordsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MostCommonStoryWordsService],
    }).compile();

    service = module.get<MostCommonStoryWordsService>(MostCommonStoryWordsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
