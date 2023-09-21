import ExportedImage from "next-image-export-optimizer";

const AirplaneImages = () => {
  return (
    <div className="ml-20 h-[130%] w-1/2 overflow-x-clip max-md:hidden">
      <div className="group absolute right-1/3 top-1/4">
        <img
          src={"/vector1.png"}
          alt={"paper plane image"}
          width={150}
          height={150}
          className="-z-10 rotate-45 transition duration-700 group-hover:-translate-x-[400px] group-hover:translate-y-[20px]"
        />
      </div>

      <div className="group absolute -right-10 top-1/3">
        <ExportedImage
          src={"/vector2.png"}
          alt={"paper plane image"}
          width={150}
          height={150}
          className="rotate-90 transition duration-700 group-hover:-translate-x-[200px] group-hover:translate-y-[400px]"
        />
      </div>

      <div className="group absolute right-1/3 top-[70%]">
        <ExportedImage
          src={"/vector3.png"}
          alt={"paper plane image"}
          width={150}
          height={150}
          className="transition duration-700 group-hover:-translate-y-[400px]"
        />
      </div>

      <div className="group absolute right-2 top-2/3">
        <ExportedImage
          src={"/vector4.png"}
          alt={"paper plane image"}
          width={150}
          height={150}
          className="rotate-90 transition duration-700 group-hover:-translate-x-[700px] group-hover:-translate-y-72"
        />
      </div>

      <div className="group absolute bottom-[30%] right-[20%]">
        <ExportedImage
          src={"/vector5.png"}
          alt={"paper plane image"}
          width={150}
          height={150}
          className="rotate-45 transition duration-700 group-hover:-translate-y-[400px] group-hover:translate-x-[400px]"
        />
      </div>

      <div className="group absolute right-36 top-[25%]">
        <ExportedImage
          src={"/vector6.png"}
          alt={"paper plane image"}
          width={150}
          height={150}
          className="-rotate-[120deg] transition duration-700 group-hover:-translate-x-[600px] group-hover:translate-y-64"
        />
      </div>
    </div>
  );
};

export default AirplaneImages;
