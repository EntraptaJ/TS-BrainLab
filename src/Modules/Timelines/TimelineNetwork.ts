// src/Modules/Timelines/TimelineNetwork.ts

import { recurrent } from 'brain.js';
import { createLSTMNetwork } from '../../Library/Brain/Brain';
import { Timeline } from './TimelineModel';

let timelineNetwork: recurrent.LSTM;

export async function createTimelinesNetwork(): Promise<recurrent.LSTM> {
  console.log('Creating timelines network');

  const timelines = await Timeline.find();

  timelineNetwork = await createLSTMNetwork(
    'timelines',
    timelines.map(({ timelineId, result }) => ({
      input: timelineId.toString(),
      output: result === true ? '1' : '0',
    })),
    true,
  );

  return timelineNetwork;
}

export function testTimeline(timelineId: number): boolean {
  const result = timelineNetwork.run(timelineId.toString());

  return result === '1';
}
