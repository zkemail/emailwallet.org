const Equations = () => {
  return (
    <div className="hidden font-mono text-xl font-semibold text-slate-300 dark:text-slate-600 md:block">
      <span className="absolute left-[24%] top-10 rotate-45">
        ([\w]+@[\w]+.[\w]+)
      </span>
      <span className="absolute left-[15%] top-1/4 -rotate-12">
        Az x Bz = Cz
      </span>
      <span className="absolute right-1/4 top-[28%] rotate-[25deg]">
        σ^e mod n = h(m)
      </span>
      <span className="absolute left-[90%] top-[27%]">ZK</span>
      <span className="absolute bottom-20 left-[40%] -rotate-12">
        (a & b) ⊕ (a & c) ⊕ (b & c)
      </span>
    </div>
  );
};

export default Equations;
