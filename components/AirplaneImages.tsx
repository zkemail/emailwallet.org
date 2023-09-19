const AirplaneImages = () => {
  return (
    <div className="group ml-20 h-[130%] w-1/2 overflow-x-clip max-md:hidden">
      <img
        src={"/paperplane.png"}
        alt={"paper plane image"}
        width={150}
        height={150}
        className="absolute right-1/3 top-1/4 rotate-45 transition duration-700 group-hover:translate-x-[400px] group-hover:translate-y-[100px]"
      />
      <img
        src={"/paperplane1.png"}
        alt={"paper plane image"}
        width={150}
        height={150}
        className="absolute -right-10 top-1/3 -rotate-45 transition duration-700 group-hover:-translate-x-[700px] group-hover:translate-y-[400px]"
      />
      <img
        src={"/paperplane2.png"}
        alt={"paper plane image"}
        width={150}
        height={150}
        className="absolute right-1/3 top-2/3 transition duration-700 group-hover:-translate-y-[400px]"
      />
      <img
        src={"/paperplane3.png"}
        alt={"paper plane image"}
        width={150}
        height={150}
        className="absolute -right-5 bottom-1/4 transition duration-700 group-hover:-translate-x-[700px] group-hover:-translate-y-24"
      />
      <img
        src={"/paperplane4.png"}
        alt={"paper plane image"}
        width={150}
        height={150}
        className="absolute bottom-[37%] right-1/4 transition duration-700 group-hover:-translate-x-[400px] group-hover:-translate-y-[400px]"
      />
      <img
        src={"/paperplane6.png"}
        alt={"paper plane image"}
        width={150}
        height={150}
        className="absolute right-24 top-1/4 transition duration-700 group-hover:-translate-x-[600px] group-hover:translate-y-64"
      />
    </div>
  );
};

export default AirplaneImages;
