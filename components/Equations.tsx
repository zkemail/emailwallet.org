const Equations = () => {
  return (
    <div className="font-mono text-xl font-semibold text-slate-300 dark:text-slate-600 md:block">
      <span className="absolute left-[24%] top-10 hidden rotate-45 md:block">
        ([\w]+@[\w]+.[\w]+)
      </span>
      <span className="absolute left-[15%] top-40 hidden -rotate-12 md:block">
        Az x Bz = Cz
      </span>
      <span className="absolute right-1/4 top-[28%] hidden rotate-[25deg] md:block">
        σ^e mod n = h(m)
      </span>
      <span className="absolute right-12 top-[17%] md:left-[82%] md:top-[35%]">
        ZK
      </span>
      <span className="absolute bottom-20 left-[40%] hidden -rotate-12 md:block">
        (a & b) ⊕ (a & c) ⊕ (b & c)
      </span>
    </div>
  );
};

export default Equations;
