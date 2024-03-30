export type Pallete = 'green' | 'ghost' | 'purple' | 'blue' | 'red' | 'white' | 'vote-red';

export type ButtonVariant = 'regular' | 'ghost' | 'ghostBordered' | 'block' | 'link' | 'icon';

export interface Asset {
    aid: number,
    metadata: string,
    mintedHi: number,
    mintedLo: number,
    owner_pk?: string,
    owner_cid?: string,
    height: number,
    parsedMetadata: any,
    limitHi?: number,
    limitLo?: number,
  }