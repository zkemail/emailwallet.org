import ExportedImage from "next-image-export-optimizer";

const AirplaneImages = () => {
  return (
    <div className="ml-20 h-[130%] w-1/2 overflow-x-clip max-md:hidden">
      <div className="group absolute right-1/3 top-1/4">
        <img
          src={"/paperplane.png"}
          alt={"paper plane image"}
          width={150}
          height={150}
          className="-z-10 rotate-45 transition duration-700 group-hover:translate-x-[400px] group-hover:translate-y-[100px]"
        />
      </div>

      <div className="group absolute -right-10 top-1/3">
        <ExportedImage
          src={"/paperplane1.png"}
          alt={"paper plane image"}
          width={150}
          height={150}
          className=" -rotate-45 transition duration-700 group-hover:-translate-x-[700px] group-hover:translate-y-[400px]"
        />
      </div>

      <div className="group absolute right-1/3 top-[60%]">
        <ExportedImage
          src={"/paperplane2.png"}
          alt={"paper plane image"}
          width={150}
          height={150}
          className="transition duration-700 group-hover:-translate-y-[400px]"
        />
      </div>

      <div className="group absolute -right-5 bottom-1/4">
        <ExportedImage
          src={"/paperplane3.png"}
          alt={"paper plane image"}
          width={150}
          height={150}
          className="transition duration-700 group-hover:-translate-x-[700px] group-hover:-translate-y-24"
        />
      </div>

      <div className="group absolute bottom-[37%] right-1/4">
        <ExportedImage
          src={"/paperplane4.png"}
          alt={"paper plane image"}
          width={150}
          height={150}
          className="transition duration-700 group-hover:-translate-x-[400px] group-hover:-translate-y-[400px]"
        />
      </div>

      <div className="group absolute right-24 top-1/4">
        <ExportedImage
          src={"/airplane.png"}
          alt={"paper plane image"}
          width={150}
          height={150}
          className="transition duration-700 group-hover:-translate-x-[600px] group-hover:translate-y-64"
        />
      </div>
    </div>
  );
};

export default AirplaneImages;
