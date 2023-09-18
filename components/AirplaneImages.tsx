import Image from "next/image";

const AirplaneImages = () => {
  return (
    <div className="-z-10">
      <Image
        src={"/paperplane.png"}
        alt={"paper plane image"}
        width={150}
        height={150}
        className="absolute right-1/3 top-1/4"
      />
      <Image
        src={"/paperplane1.png"}
        alt={"paper plane image"}
        width={150}
        height={150}
        className="absolute -right-10 top-1/3"
      />
      <Image
        src={"/paperplane2.png"}
        alt={"paper plane image"}
        width={150}
        height={150}
        className="absolute right-1/3 top-2/3"
      />
      <Image
        src={"/paperplane3.png"}
        alt={"paper plane image"}
        width={150}
        height={150}
        className="absolute -right-5 bottom-1/4"
      />
      <Image
        src={"/paperplane4.png"}
        alt={"paper plane image"}
        width={150}
        height={150}
        className="absolute bottom-[37%] right-1/4"
      />
      <Image
        src={"/paperplane6.png"}
        alt={"paper plane image"}
        width={150}
        height={150}
        className="absolute right-24 top-1/4"
      />
    </div>
  );
};

export default AirplaneImages;
