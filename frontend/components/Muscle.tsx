
import { JSX } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";


export type Muscle = {
  id: number;
  name: string;
  origin: string;
  insertion: string;
  innovation: string;
  action: string;
  palpation_key: string;
  img?: string;
};

export function MuscleCard({
  id,
  name,
  origin,
  insertion,
  innovation,
  action,
  palpation_key,
  img = "/default-muscle.jpg", // fallback image
}: Muscle) {
  return (
    <div class="rounded-lg shadow-md p-4 bg-white">
      {/* <img class="rounded-lg w-full h-48 object-cover" src={img} alt={name} /> */}
      <div class="mt-4">
        <div class="text-xs font-bold text-sky-500">Muscle Info</div>
        <div class="mt-1 font-bold text-gray-700">
          <a href={`/muscles/${id}`} class="hover:underline">
            {name}
          </a>
        </div>
        <div class="">
            <div class="">Origin</div>
            <div class="mt-2 text-sm text-gray-600" style="white-space: pre-line;">{origin}</div>
        </div>
        <div class="">
            <div class="">Insertion</div>
            <div class="mt-2 text-sm text-gray-600" style="white-space: pre-line;">{insertion}</div>
        </div>
        <div class="">
            <div class="">Innovation</div>
            <div class="mt-2 text-sm text-gray-600" style="white-space: pre-line;">{innovation}</div>
        </div>
        <div class="Action">
            <div class="">Action</div>
            <div class="mt-2 text-sm text-gray-600" style="white-space: pre-line;">{action}</div>
        </div>
        <div class="">
            <div class="">Palpation Key</div>
            <span class="mt-2 text-sm text-gray-600" style="white-space: pre-line;">{palpation_key}</span>
        </div>
      </div>
    </div>
  );
}
