import Triangle from "@/components/Triangle";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import ExportedImage from "next-image-export-optimizer";
import React from "react";

const InfoGraphSm = () => {
  const box =
    "w-[180px] rounded-full border dark:border-slate-600 bg-slate-100 py-3 text-center text-sm dark:bg-primary-foreground dark:text-primary drop-shadow";

  const box2 =
    "flex w-[180px] items-center gap-x-3 rounded-full border bg-slate-100 py-3 text-center text-sm drop-shadow dark:border-slate-600 dark:bg-primary-foreground dark:text-primary";

  return (
    <div className="mt-16 flex flex-col items-center gap-4 lg:hidden">
      <div className={box}>you@gmail.com</div>
      <div className="mt-8 flex flex-col items-center gap-2">
        <div className="flex rotate-90 items-center text-[#7B9BF3]">
          --------
          <ArrowRight className="-ml-[2px] mt-[1px]" size={17} />
        </div>

        <div className={cn(box2, "mt-8")}>
          <div className="relative -my-2 ml-1 h-[33px] w-[33px]">
            <ExportedImage src={"/dollarIcon.svg"} alt={"dollar icon"} fill />
          </div>
          <span className="flex items-center gap-x-2 uppercase">
            -3.0 usdc
            <Triangle className="rotate-180" />
          </span>
        </div>
      </div>

      <div className="my-8 flex rotate-90 items-center text-[#7B9BF3]">
        --------
        <ArrowRight className="-ml-[2px] mt-[1px]" size={17} />
      </div>

      <div className="flex gap-4 rounded-lg p-4 max-sm:flex-col max-sm:border max-sm:shadow">
        <div className={box}>Prover</div>
        <div className={box}>Relayer</div>
        <div className={box}>Ethereum</div>
      </div>

      <div className="my-8 flex rotate-90 items-center text-[#7B9BF3]">
        --------
        <ArrowRight className="-ml-[2px] mt-[1px]" size={17} />
      </div>

      <div className="mb-8 flex flex-col-reverse items-center gap-2 drop-shadow">
        <div className="flex rotate-90 items-center text-[#7B9BF3]">
          --------
          <ArrowRight className="-ml-[2px] mt-[1px]" size={17} />
        </div>

        <div className={cn(box2, "mb-10")}>
          <div className="relative -my-2 ml-1 h-[33px] w-[33px]">
            <ExportedImage src={"/dollarIcon.svg"} alt={"dollar icon"} fill />
          </div>
          <span className="flex items-center gap-x-2 uppercase">
            +3.0 usdc
            <Triangle className="border-b-green-500" />
          </span>
        </div>
      </div>

      <div className={box}>friend@outlook.com</div>
    </div>
  );
};

export default InfoGraphSm;
