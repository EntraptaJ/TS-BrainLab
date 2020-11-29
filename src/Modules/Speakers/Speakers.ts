// src/Library/Speakers.ts
import { registerEnumType } from 'type-graphql';

export enum Speakers {
  KRISTIAN = 'Kristian',
  LANEY = 'Laney',
  ADI = 'Adi',
  HARPREET = 'Harpreet',
  RANDOM = 'Yvette',
}

registerEnumType(Speakers, {
  name: 'Speakers',
});
