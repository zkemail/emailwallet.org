const BgText = () => {
  return (
    <div className="font-mono text-xl font-semibold text-slate-300 dark:text-slate-600">
      <span className="absolute left-[30%] top-0 rotate-45">prove</span>
      <span className="absolute left-[15%] top-1/4 -rotate-12">e=mc^2</span>
      <span className="absolute right-1/4 top-[28%] rotate-[25deg]">
        f(x)=x
      </span>
      <span className="absolute left-[90%] top-[27%]">ZK</span>
      <span className="absolute bottom-20 left-[40%] -rotate-12">
        f(x)=x^3+x^2+1
      </span>
    </div>
  );
};

export default BgText;
