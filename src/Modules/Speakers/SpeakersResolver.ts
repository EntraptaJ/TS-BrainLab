// src/Modules/Speakers/SpeakersResolver.ts
import { Arg, Mutation, Query } from 'type-graphql';
import { Speakers } from './Speakers';
import { speakersNetwork } from './SpeakersNetwork';

export class SpeakerResolver {
  @Query(() => String)
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

  @Mutation(() => Boolean)
  public trainSpeakersNetwork(): boolean {
    setImmediate(() => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      speakersNetwork.trainNetwork();
    }, 1500);

    return true;
  }
}
