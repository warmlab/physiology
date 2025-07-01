
import { JSX } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { useState, useEffect } from "preact/hooks";

import { Terminology } from "../components/Terminology.tsx";


export function TerminologyItem(slug: string, term: string, year: number = 1, module: number = 1, blank: boolean =false) {
  return (
    <a href={`/terminology/detail?slug=${slug}&blank=${blank}`}
      class="font-serif p-4 rounded-xl shadow-sm bg-white hover:bg-sky-50 hover:shadow-md transition duration-200 border border-blue-100 flex flex-row items-center">
      <div class={`text-lg font-medium text-blue-800 mb-1 flex grow ${blank ? "blur-sm": ""}`}>{term}</div>
      <div class="text-blue-600 text-xs">
        <span class="inline-block">🔖</span>
      </div>
    </a>
  );
}


export function TerminologyList() {
  const [terminologies, setTerminologies] = useState<Terminology[]>([]);
  const [limit, setLimit] = useState(5);
  const [random, setRandom] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchTerminologies = async (count: number, random: boolean = false) => {
    setLoading(true);
    // const res = await fetch(`/terminologys?limit=${count}`);
    // const data = await res.json();
    // setTerminologys(data);

    //const res = await fetch(`http://localhost:8000/terminologys/?limit=${count}&random=${random}`);
    const res = await fetch(`/api/terminology/list?limit=${count}&random=${random}`);
    const data = await res.json();
    //return new Response(JSON.stringify(data), {
    //  headers: { "Content-Type": "application/json" },
    //});
    setTerminologies(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchTerminologies(limit, random);
  }, [limit, random]);

  return (
    <div class="max-w-3xl mx-auto px-4 py-8">
      <div class="flex flex-row items-center border-b-2 border-blue-100 mb-2">
        <h1 class="text-3xl font-bold text-blue-800">Medical Terminology</h1>
      </div>
      <div class="grid sm:grid-cols-2 gap-4 font-serif">
        {/*{terminologies.map((item) => (
          <a href={`terminology/detail?slug=${item.slug}`}
            class="flex p-4 rounded-xl shadow-sm bg-white hover:bg-green-50 hover:shadow-md transition duration-200 border border-gray-200">
            <div class="text-lg font-semibold text-gray-800">{item.term}</div>
          </a>
        ))}*/}
        {terminologies.map((term) => TerminologyItem(term.slug, term.term))}
      </div>
    </div>
  );
}

export function TerminologyCard(terminology: Terminology) {
  return (
    <div class="font-serif rounded-lg p-4 h-screen">
      {/* <img class="rounded-lg w-full h-48 object-cover" src={img} alt={name} /> */}
      <div class="mt-1">
        <div class="mb-8 font-bold text-blue-800 text-3xl p-2 border-b-2 border-blue-100">{terminology.term}</div>
        <div class="mb-6 border-solid border-blue-100 border-2 rounded-lg mt-4 bg-white">
            <span class="text-lg rounded-md font-semibold bg-blue-200 p-2 text-blue-700 ml-2 relative -top-3" style="">Definition</span>
            <div class="text-lg text-gray-700 p-2 pt-0" style="white-space: pre-line;">{terminology.definition}</div>
        </div>
        {terminology.note && (
            <div>
            <span class="text-lg rounded-md font-semibold bg-blue-200 p-2 text-blue-700 ml-2 relative -top-3" style="">Note</span>
            <div class="text-lg text-gray-700 p-2 pt-0">{terminology.note}</div>
            </div>
        )}
      </div>
    </div>
  );
}
