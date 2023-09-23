import Triangle from "@/components/Triangle";
import { ArrowRight } from "lucide-react";
import ExportedImage from "next-image-export-optimizer";

const InfoGraph = () => {
  const box =
    "w-[180px] rounded-full border dark:border-slate-600 bg-slate-100 py-3 text-center text-sm dark:bg-primary-foreground dark:text-primary";

  return (
    <div className="mt-16 flex items-center gap-x-4">
      <div className={box}>you@gmail.com</div>
      <div className="mt-14 flex flex-col items-center gap-2">
        <div className="flex items-center text-[#7B9BF3]">
          ----------------------
          <ArrowRight className="-ml-[2px] mt-[1px]" size={17} />
        </div>
        <div className="flex w-[180px] items-center gap-x-3 rounded-full border bg-slate-100 py-3 text-center text-sm dark:border-slate-600 dark:bg-primary-foreground dark:text-primary">
          <div className="relative -my-2 ml-1 h-[33px] w-[33px]">
            <ExportedImage src={"/dollarIcon.svg"} alt={"dollar icon"} fill />
          </div>
          <span className="flex items-center gap-x-2 uppercase">
            -3.0 usdc
            <Triangle className="rotate-180" />
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className={box}>Prover</div>
        <div className={box}>Privacy Layer</div>
        <div className={box}>Ethereum</div>
      </div>

      <div className="mb-14 flex flex-col-reverse items-center gap-2">
        <div className="flex items-center text-[#7B9BF3]">
          ----------------------
          <ArrowRight className="-ml-[2px] mt-[1px]" size={17} />
        </div>
        <div className="flex w-[180px] items-center gap-x-3 rounded-full border bg-slate-100 py-3 text-center text-sm dark:border-slate-600 dark:bg-primary-foreground dark:text-primary">
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

export default InfoGraph;
