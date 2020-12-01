// src/Modules/Speakers/SpeakersResolver.ts
import { Arg, Mutation, Query } from 'type-graphql';
import { Speakers } from './Speakers';
import { speakersNetwork } from './SpeakersNetwork';

export class SpeakerResolver {
  @Query(() => String, {
    description:
      'Use the Spekaers neural network to determine who the speaker is refering to with a string of text',
  })
  public speakingTo(
    @Arg('speaker', () => Speakers)
    speaker: Speakers,
    @Arg('text') text: string,
  ): string {
    const result = speakersNetwork.speakingToWho(speaker, text);

    if (typeof result !== 'string') {
      throw new Error('Network returned invalid result Error 505');
    }

    console.log(result);

    return result;
  }

  @Mutation(() => Boolean, {
    description: 'Start a training job of the Speakers Neural Network',
  })
  public trainSpeakersNetwork(): boolean {
    setImmediate(() => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      speakersNetwork.trainNetwork();
    }, 1500);

    return true;
  }
}
