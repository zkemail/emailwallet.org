"use client";
import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);

  return (
    <div className="flex flex-col text-center py-8 sm:py-24">
      <div className="max-w-3xl mx-auto p-4">
        <div className="flex flex-col gap-2 pb-8">
          <h1 className="text-4xl font-medium">Send money</h1>
          <h2 className="text-slate-500">
            All you need to do is email the relayer!
          </h2>
        </div>

        <div className="flex flex-col gap-4">
          <input
            type="number"
            placeholder="USDC"
            onChange={(e) => setAmount(Number(e.target.value))}
            className="text-sm rounded-lg block w-full p-2.5 bg-slate-200"
          />

          <input
            type="email"
            className="text-sm rounded-lg block w-full p-2.5 bg-slate-200 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
          disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
          invalid:border-pink-500 invalid:text-pink-600
          focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
            placeholder="friend@email.com"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />

          <a
            href={`mailto:relayer@sendeth.org?subject=Send%20${amount}%20DAI%20to%20${email}`}
            className={
              amount > 0 && email.length > 0
                ? "bg-green-500 bg-gradient-to-t from-blue-600 to-blue-500 rounded-lg h-12 flex border border-blue-500 text-white px-4 py-2 gap-4 items-center justify-center ease-in-out hover:transition-all hover:scale-105"
                : "bg-gray-300 px-4 py-2 gap-4 items-center rounded-lg h-12 flex text-slate-50 justify-center pointer-events-none"
            }
          >
            Send
          </a>
        </div>
      </div>
    </div>
  );
}
