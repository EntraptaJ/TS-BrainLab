// src/Modules/Speakers/TrainingData.ts

import { SpeakingData } from './SpeakingData';

interface TrainingData {
  input: SpeakingData;
  output: string;
}

// create data which will be used for training
export const speakingTrainingData: TrainingData[] = [
  {
    // Laney as Speaker to Kristian
    input: {
      speaker: 'Laney',
      text: 'Kristian',
    },
    output: 'Kristian',
  },
  {
    input: {
      speaker: 'Laney',
      text: 'Honey',
    },
    output: 'Kristian',
  },
  {
    input: {
      speaker: 'Laney',
      text: 'Honeybear',
    },
    output: 'Kristian',
  },
  {
    input: {
      speaker: 'Laney',
      text: 'Babe',
    },
    output: 'Kristian',
  },
  {
    input: {
      speaker: 'Laney',
      text: 'Kristian Jones',
    },
    output: 'Kristian',
  },
  {
    input: {
      speaker: 'Laney',
      text: 'Kristian F Jones',
    },
    output: 'Kristian',
  },

  // Laney as speaker to Adi
  {
    input: {
      speaker: 'Laney',
      text: 'Adi',
    },
    output: 'Adi',
  },
  {
    input: {
      speaker: 'Laney',
      text: 'Adi Linden',
    },
    output: 'Adi',
  },

  // Laney as Speaker to Harpreet
  {
    input: {
      speaker: 'Laney',
      text: 'Harpreet',
    },
    output: 'Harpreet',
  },
  {
    input: {
      speaker: 'Laney',
      text: 'HP',
    },
    output: 'Harpreet',
  },

  // Kristian as Speaker to Harpreet
  {
    input: {
      speaker: 'Kristian',
      text: 'Harpreeet',
    },
    output: 'Harpreet',
  },
  {
    input: {
      speaker: 'Kristian',
      text: 'HP',
    },
    output: 'Harpreet',
  },

  // Kristian as Speaker to Laney
  {
    input: {
      speaker: 'Kristian',
      text: 'Laney',
    },
    output: 'Laney',
  },
  {
    input: {
      speaker: 'Kristian',
      text: 'Laney Gliddy',
    },
    output: 'Laney',
  },
  {
    input: {
      speaker: 'Kristian',
      text: 'Honeybear',
    },
    output: 'Laney',
  },
  {
    input: {
      speaker: 'Kristian',
      text: 'Honey',
    },
    output: 'Laney',
  },
  {
    input: {
      speaker: 'Kristian',
      text: 'Babe',
    },
    output: 'Laney',
  },
  {
    input: {
      speaker: 'Kristian',
      text: 'Babe',
    },
    output: 'Laney',
  },

  // Adi as Speaker to Kristian
  {
    input: {
      speaker: 'Adi',
      text: 'Kristian',
    },
    output: 'Kristian',
  },
  {
    input: {
      speaker: 'Adi',
      text: 'Kristian Jones',
    },
    output: 'Kristian',
  },
  {
    input: {
      speaker: 'Adi',
      text: 'Kristian F Jones',
    },
    output: 'Kristian',
  },
  {
    input: {
      speaker: 'Adi',
      text: 'KristianFJones',
    },
    output: 'Kristian',
  },

  // Adi as Speaker to Laney
  {
    input: {
      speaker: 'Adi',
      text: 'Laney',
    },
    output: 'Laney',
  },
  {
    input: {
      speaker: 'Adi',
      text: 'Laney Gliddy',
    },
    output: 'Laney',
  },

  // Adi as Speaker to Harpreet
  {
    input: {
      speaker: 'Adi',
      text: 'Harpreeet',
    },
    output: 'Harpreet',
  },
  {
    input: {
      speaker: 'Adi',
      text: 'HP',
    },
    output: 'Harpreet',
  },

  // Kristian as spekaer to Adi
  {
    input: {
      speaker: 'Kristian',
      text: 'Adi',
    },
    output: 'Adi',
  },
  {
    input: {
      speaker: 'Kristian',
      text: 'Adi Linden',
    },
    output: 'Adi',
  },
];
