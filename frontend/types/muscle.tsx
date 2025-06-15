export type Muscle = {
  id: number;
  slug: string;
  name: string;
  origin: string;
  insertion: string;
  innervation: string;
  action: string;
  palpation_key: string;
  year: number;
  module: number;
  blank: boolean;
  reminder: string;
  img?: string;
};
