import React, { Fragment, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDown } from "lucide-react";
import { inputStyles } from "@/components/ui/input";
import ToolTip from "@/components/ToolTip";
import { cn } from "@/lib/utils";

interface FromEmailInputProps {
  fromEmail: string;
  isErrors: {
    toEmail: boolean;
    fromEmail: boolean;
  };
  setFromEmail: (value: string) => void;
  storedEmails: string[];
}

export const FromEmailInput = ({
  setFromEmail,
  fromEmail,
  isErrors,
  storedEmails,
}: FromEmailInputProps) => {
  const [query, setQuery] = useState("");

  const filteredEmail =
    query === ""
      ? storedEmails
      : storedEmails.filter((email) => {
          return email.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <div className="flex w-full items-center border-b-[1px] border-[#515364]/30 p-2">
      <Combobox value={fromEmail} onChange={setFromEmail}>
        <div className="relative mt-1">
          <div className="flex items-center gap-x-2 sm:text-sm">
            <Combobox.Label className={"text-sm font-medium text-[#515364]"}>
              From:
            </Combobox.Label>
            <Combobox.Input
              className={cn(
                "min-w-[250px] sm:min-w-[400px]",
                inputStyles,
                isErrors.fromEmail && "border-red-500",
                "border-2 border-gray-700 bg-slate-950 text-white",
              )}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="john@doe.com"
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronDown
                className="h-5 w-5 text-gray-300"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options className="absolute ml-11 mt-1 max-h-60 w-full overflow-auto rounded-md bg-slate-900 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              {filteredEmail.length === 0 || query !== "" ? (
                <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredEmail.map((email) => (
                  <Combobox.Option
                    key={email}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active
                          ? "mx-1 rounded-md bg-slate-500 text-gray-900"
                          : "text-white"
                      }`
                    }
                    value={email}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {email}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? "text-white" : "text-sky-500"
                            }`}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
      <ToolTip text="Copy to clipboard">
        <button
          onClick={() => {
            navigator.clipboard.writeText(fromEmail);
          }}
          className="pulsetarget mt-2 px-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-6 w-6 text-[#515364]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"
            />
          </svg>
        </button>
      </ToolTip>
    </div>
  );
};
