import { JSX } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { useState, useEffect } from "preact/hooks";

import { Muscle } from "../types/muscle.ts";


export function MuscleCard(muscle: Muscle) {
  const [showAll, setShowAll] = useState(!muscle.blank);

  const toggleShowAll = () => setShowAll(!showAll);

  const isBlurred = (field: string) =>
    muscle.blank && !showAll && muscle.reminder !== field;

  return (
    <div class="rounded-lg p-4 bg-gray-100 h-screen">
      {/* <img class="rounded-lg w-full h-48 object-cover" src={img} alt={name} /> */}
      <div class="mt-1">
        <div class={`mb-8 font-bold text-blue-800 text-3xl p-2 border-b-2 border-blue-100 ${ isBlurred("name") ? "blur-md" : ""}`}>{muscle.name}</div>
        <div class="mb-6 border-solid border-blue-100 border-2 rounded-lg mt-4 bg-white">
            <span class="text-lg rounded-md font-semibold bg-blue-200 p-2 text-blue-700 ml-2 relative -top-3" style="">Action</span>
            <div class={`text-lg text-gray-700 p-2 pt-0 ${ isBlurred("action") ? "blur-md" : ""}`} style="white-space: pre-line;">{muscle.action}</div>
        </div>
        <div class="mb-6 border-solid border-blue-100 border-2 rounded-lg mt-4 bg-white">
            <span class="text-lg rounded-md font-semibold bg-blue-200 p-2 text-blue-700 ml-2 relative -top-3">Origin</span>
            <div class={`text-lg text-gray-700 p-1 ${ isBlurred("origin") ? "blur-md" : ""}`} style="white-space: pre-line;">{muscle.origin}</div>
        </div>
        <div class="mb-6 border-solid border-blue-100 border-2 rounded-lg mt-4 bg-white">
            <span class="text-lg rounded-md font-semibold bg-blue-200 p-2 text-blue-700 ml-2 relative -top-3">Insertion</span>
            <div class={`text-lg text-gray-700 p-2 pt-0 ${ isBlurred("insertion") ? "blur-md" : ""}`} style="white-space: pre-line;">{muscle.insertion}</div>
        </div>
        <div class="mb-6 border-solid border-blue-100 border-2 rounded-lg mt-4 bg-white">
            <span class="text-lg rounded-md font-semibold bg-blue-200 p-2 text-blue-700 ml-2 relative -top-3">Innervation</span>
            <div class={`text-lg text-gray-700 p-2 pt-0 ${ muscle.blank && !showAll ? "blur-md" : ""}`} style="white-space: pre-line;">{muscle.innervation}</div>
        </div>
        <div class="mb-6 border-solid border-blue-100 border-2 rounded-lg mt-4 bg-white">
            <span class="text-lg rounded-md font-semibold bg-blue-200 p-2 text-blue-700 ml-2 relative -top-3">Palpation Key</span>
            <div class={`text-lg text-gray-700 p-2 pt-0 ${ muscle.blank && !showAll ? "blur-md" : ""}`} style="white-space: pre-line;">{muscle.palpation_key}</div>
        </div>
      </div>
      {muscle.blank && (
        <div class="mb-4 text-right">
          <button type="button" onClick={toggleShowAll}
            class="text-sm px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
            {showAll ? "Hide" : "Show" }
          </button>
        </div>
      )}
    </div>
  );
}

export function MuscleItem(slug: string, name: string, year: number, module: number, blank: boolean =false) {
  return (
    <a href={`/muscle/detail?slug=${slug}&blank=${blank}`}
      class="p-4 rounded-xl shadow-sm bg-white hover:bg-sky-50 hover:shadow-md transition duration-200 border border-blue-100 flex flex-row items-center">
      <div class={`text-lg font-medium text-blue-800 mb-1 flex grow ${blank ? "blur-sm": ""}`}>{name}</div>
      <div class="text-blue-600 text-xs">
        <span class="inline-block">🔖 Y{year}M{module}</span>
      </div>
    </a>
  );
}


export function MuscleList() {
  const [muscles, setMuscles] = useState<Muscle[]>([]);
  const [limit, setLimit] = useState(5);
  const [random, setRandom] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchMuscles = async (count: number, random: boolean = false) => {
    setLoading(true);
    // const res = await fetch(`/muscles?limit=${count}`);
    // const data = await res.json();
    // setMuscles(data);

    //const res = await fetch(`http://localhost:8000/muscles/?limit=${count}&random=${random}`);
    const res = await fetch(`/api/muscle/list?limit=${count}&random=${random}`);
    const data = await res.json();
    //return new Response(JSON.stringify(data), {
    //  headers: { "Content-Type": "application/json" },
    //});
    setMuscles(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchMuscles(limit, random);
  }, [limit, random]);

  return (
    <div class="p-6 max-w-screen-lg mx-auto">
      <div class="flex flex-row items-center border-b-2 border-blue-100 mb-2">
        <h1 class="text-3xl font-bold text-blue-800 grow">Muscles Study</h1>
      </div>
      <div class="flex flex-row justify-between mb-2">
        <button type="button" onClick={(e) => { setRandom(!random); fetchMuscles(limit, random)}} class="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded m-1">
          {random ? "Test" : "Study"}
        </button>
        {random && (<div>
          <input type="number" value={limit} onInput={(e) => setLimit(Number((e.target as HTMLInputElement).value))}
            class="border px-1 py-2 rounded w-10 m-1" min="1" />
          <button type="button" onClick={() => fetchMuscles(limit, random)} class="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 py-2 m-1 rounded">Shuffle Muscles</button>
          {/*<button type="submit" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded">Get Muscles</button> */}
        </div>)}
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {muscles.map((muscle) => MuscleItem(muscle.slug, muscle.name, muscle.year, muscle.module, random))}
      </div>
    </div>
  );
}
