// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $_404 from "./routes/_404.tsx";
import * as $_app from "./routes/_app.tsx";
import * as $api_joke from "./routes/api/joke.ts";
import * as $api_muscle_detail from "./routes/api/muscle/detail.ts";
import * as $api_muscle_list from "./routes/api/muscle/list.ts";
import * as $greet_name_ from "./routes/greet/[name].tsx";
import * as $index from "./routes/index.tsx";
import * as $muscle_detail from "./routes/muscle/detail.tsx";
import * as $muscle_list from "./routes/muscle/list.tsx";
import * as $terminology_detail from "./routes/terminology/detail.tsx";
import * as $terminology_list from "./routes/terminology/list.tsx";
import * as $BookingForm from "./islands/BookingForm.tsx";
import * as $Counter from "./islands/Counter.tsx";
import * as $Muscle from "./islands/Muscle.tsx";
import type { Manifest } from "$fresh/server.ts";

const manifest = {
  routes: {
    "./routes/_404.tsx": $_404,
    "./routes/_app.tsx": $_app,
    "./routes/api/joke.ts": $api_joke,
    "./routes/api/muscle/detail.ts": $api_muscle_detail,
    "./routes/api/muscle/list.ts": $api_muscle_list,
    "./routes/greet/[name].tsx": $greet_name_,
    "./routes/index.tsx": $index,
    "./routes/muscle/detail.tsx": $muscle_detail,
    "./routes/muscle/list.tsx": $muscle_list,
    "./routes/terminology/detail.tsx": $terminology_detail,
    "./routes/terminology/list.tsx": $terminology_list,
  },
  islands: {
    "./islands/BookingForm.tsx": $BookingForm,
    "./islands/Counter.tsx": $Counter,
    "./islands/Muscle.tsx": $Muscle,
  },
  baseUrl: import.meta.url,
} satisfies Manifest;

export default manifest;
