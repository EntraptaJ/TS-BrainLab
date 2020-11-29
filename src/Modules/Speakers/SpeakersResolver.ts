// src/Modules/Speakers/SpeakersResolver.ts
import { Arg, Query } from 'type-graphql';
import { Speakers } from './Speakers';
import { speakersNetwork } from './SpeakersNetwork';

export class SpeakerResolver {
  @Query(() => String)
  public speakingTo(
    @Arg('speaker', () => Speakers)
    speaker: Speakers,
    @Arg('text') text: string,
  ): string {
    const result = speakersNetwork.run([speaker, text]);

    if (typeof result !== 'string') {
      throw new Error('Network returned invalid result Error 505');
    }

    console.log(result);

    return result;
  }
}
