import { PartialType } from '@nestjs/mapped-types';
import { CreateMostCommonStoryWordDto } from './create-most-common-story-word.dto';

export class UpdateMostCommonStoryWordDto extends PartialType(CreateMostCommonStoryWordDto) {}
