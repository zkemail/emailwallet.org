const Equations = () => {
  return (
    <div className="-z-20 font-mono text-xl font-semibold text-slate-300 opacity-50 dark:text-slate-600 md:block">
      <span className="absolute left-[24%] top-10 hidden rotate-12 md:block">
        ([\w]+@[\w]+.[\w]+)
      </span>
      <span className="absolute left-[15%] top-40 hidden -rotate-12 md:block">
        Az x Bz = Cz
      </span>
      <span className="absolute right-1/4 top-[48%] hidden rotate-[25deg] md:block">
        σ^e mod n = h(m)
      </span>
      <span className="absolute left-[88%] top-[28%] md:left-[83%] md:top-[33%]">
        ZK
      </span>
      <span className="absolute bottom-10 left-[40%] hidden -rotate-12 md:block">
        (a & b) ⊕ (a & c) ⊕ (b & c)
      </span>
    </div>
  );
};

export default Equations;
