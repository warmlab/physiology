import { JSX } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";


export type Terminology = {
  name: string;
  slug: string | null;
  description: string | null;
  note: string | null;
};
