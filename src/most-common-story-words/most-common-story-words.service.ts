import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom, last, Observable } from 'rxjs';
import { Story } from 'src/story.interface';

@Injectable()
export class MostCommonStoryWordsService {
  constructor(private httpService: HttpService) {}

  async findAll(
    top: number,
    last: number,
  ): Promise<{ word: string; count: number }[]> {
    top = top || 10;
    last = last || 25;
    const data = this.httpService.get(`/newstories.json?print=pretty`);
    const response = await firstValueFrom(data);
    const stories = response.data.slice(0, last);
    let wordsMap = new Map<string, number>();

    const promises = stories.map(async (id) => {
      let story_data = this.httpService.get(`/item/${id}.json?print=pretty`);
      const story: Story = await (await firstValueFrom(story_data)).data;

      const words = story.title
        .trim()
        .replace('\\p{Punct}', '')
        .toLowerCase()
        .split(/\s+/);

      for (let word of words) {
        if (!wordsMap.has(word)) {
          wordsMap.set(word, 1);
        } else {
          wordsMap.set(word, wordsMap.get(word) + 1);
        }
      }

      return story;
    });
    await Promise.all(promises);
    const storyWords: { word: string; count: number }[] = Array.from(
      wordsMap.entries(),
    )
      .sort((a, b) => {
        return b[1] - a[1];
      })
      .slice(0, top)
      .flatMap(([word, count]) => ({ word: word, count: count }));

    return storyWords;
  }

  async findTop10StoryWithUserWithMinKarma(
    top: number,
    minKarma: number,
  ): Promise<{ word: string; count: number }[]> {
    top = top || 10;
    minKarma = minKarma || 10000;
    const data = this.httpService.get(`/beststories.json?print=pretty`);
    const response = await firstValueFrom(data);
    console.log(response.data.length, ' is the length of the topstories');
    const stories = response.data;
    let wordsMap = new Map<string, number>();

    const promises = stories.map(async (id) => {
      let story_data = this.httpService.get(`/item/${id}.json?print=pretty`);
      const story: Story = await (await firstValueFrom(story_data)).data;
      const user = await firstValueFrom(
        this.httpService.get(`/user/${story.by}.json?print=pretty`),
      );
      if (story.type === 'story' && user.data.karma > minKarma) {
        const regex = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;

        const words = story.title
          .trim()
          .replace(regex, '')
          .toLowerCase()
          .split(/\s+/);

        for (let word of words) {
          if (!wordsMap.has(word)) {
            wordsMap.set(word, 1);
          } else {
            wordsMap.set(word, wordsMap.get(word) + 1);
          }
        }
      }

      return story;
    });
    await Promise.all(promises);
    const storyWords: { word: string; count: number }[] = Array.from(
      wordsMap.entries(),
    )
      .sort((a, b) => {
        return b[1] - a[1];
      })
      .slice(0, top)
      .flatMap(([word, count]) => ({ word: word, count: count }));

    return storyWords;
  }

  async findTop10LastWeekStory(
    top: number,
    time: string,
  ): Promise<{ word: string; count: number }[]> {
    time = time || 'lastTime';
    top = top || 10;
    const lastTime = {
      lastWeek: Date.now() - 7 * 24 * 60 * 60 * 1000,
      lastMonth: Date.now() - 30 * 24 * 60 * 60 * 1000,
      lastYear: Date.now() - 365 * 24 * 60 * 60 * 1000,
    };
    const data = this.httpService.get(`/newstories.json?print=pretty`);
    const response = await firstValueFrom(data);
    const stories = response.data;
    let wordsMap = new Map<string, number>();

    const promises = stories.map(async (id) => {
      let story_data = this.httpService.get(`/item/${id}.json?print=pretty`);
      const story: Story = await (await firstValueFrom(story_data)).data;
      if (story.time === lastTime[time]) {
        const words = story.title
          .trim()
          .replace('\\p{Punct}', '')
          .toLowerCase()
          .split(/\s+/);

        for (let word of words) {
          if (!wordsMap.has(word)) {
            wordsMap.set(word, 1);
          } else {
            wordsMap.set(word, wordsMap.get(word) + 1);
          }
        }
      }

      return story;
    });
    await Promise.all(promises);
    const storyWords: { word: string; count: number }[] = Array.from(
      wordsMap.entries(),
    )
      .sort((a, b) => {
        return b[1] - a[1];
      })
      .slice(0, top)
      .flatMap(([word, count]) => ({ word: word, count: count }));

    return storyWords;
  }

  findOne(id: number) {
    return `This action returns a #${id} mostCommonStoryWord`;
  }
}
