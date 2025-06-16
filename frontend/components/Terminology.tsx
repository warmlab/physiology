import { JSX } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";


export type Terminology = {
  term: string;
  slug: string;
  definition: string | null;
  note: string | null;
};
