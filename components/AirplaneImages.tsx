import useMediaQuery from "@/hooks/useMediaQuery";
import {
  circInOut,
  circOut,
  cubicBezier,
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import ExportedImage from "next-image-export-optimizer";

const AirplaneImages = () => {
  const { scrollYProgress } = useScroll();

  const x = useTransform(scrollYProgress, [0, 0.4, 0.8], [0, -150, -200], {
    ease: cubicBezier(0.17, 0.67, 0.83, 0.67),
  });
  const y = useTransform(scrollYProgress, [0, 1.5], [0, 600], {
    ease: cubicBezier(0.17, 0.67, 0.83, 0.67),
  });
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 40], {
    ease: cubicBezier(0.17, 0.67, 0.83, 0.67),
  });

  const skewX = useTransform(scrollYProgress, [0, 4], [0, 130], {
    ease: cubicBezier(0.17, 0.67, 0.83, 0.67),
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1.3], {
    ease: cubicBezier(0.17, 0.67, 0.83, 0.67),
  });

  const isLargeScreen = useMediaQuery("(min-width: 710px)");

  return (
    // <div className="ml-20 h-[130%] w-1/2 overflow-x-clip">
    <motion.div
      style={{ y, x, rotate, skewX, scale }}
      className="group relative -right-[43%] bottom-[98%] -z-10 md:-top-[50%] md:right-[20%]"
    >
      <ExportedImage
        src={"/vector3.png"}
        alt={"paper plane image"}
        width={isLargeScreen ? 150 : 80}
        height={isLargeScreen ? 150 : 80}
        className="-z-10 -rotate-[150deg]"
      />
    </motion.div>

    /* <div className="group absolute right-1/3 top-1/3 max-md:hidden">
        <ExportedImage
          src={"/vector1.png"}
          alt={"paper plane image"}
          width={150}
          height={150}
          className="-z-10 rotate-45 transition duration-700 group-hover:-translate-x-[400px] group-hover:translate-y-[20px]"
        />
      </div> */

    /* <div className="group absolute right-48 top-[55%] max-md:hidden">
        <ExportedImage
          src={"/vector2.png"}
          alt={"paper plane image"}
          width={150}
          height={150}
          className="rotate-90 transition duration-700 group-hover:-translate-x-[200px] group-hover:translate-y-[400px]"
        />
      </div>

      <div className="group absolute right-[%] top-[70%] max-md:hidden">
        <ExportedImage
          src={"/vector3.png"}
          alt={"paper plane image"}
          width={150}
          height={150}
          className="transition duration-700 group-hover:-translate-y-[400px]"
        />
      </div>

      <div className="group absolute right-2 top-2/3 max-md:hidden">
        <ExportedImage
          src={"/vector4.png"}
          alt={"paper plane image"}
          width={150}
          height={150}
          className="rotate-90 transition duration-700 group-hover:-translate-x-[700px] group-hover:-translate-y-72"
        />
      </div> */

    /* <div className="group absolute bottom-[30%] right-[20%] max-md:hidden">
        <ExportedImage
          src={"/vector5.png"}
          alt={"paper plane image"}
          width={150}
          height={150}
          className="rotate-45 transition duration-700 group-hover:-translate-y-[400px] group-hover:translate-x-[400px]"
        />
      </div> */

    /* <div className="group absolute right-7 top-[22%] h-[100px] w-[100px] md:right-36 md:top-[25%] md:h-[150px] md:w-[150px]">
        <ExportedImage
          src={"/vector6.png"}
          alt={"paper plane image"}
          fill
          className="-rotate-[120deg] transition duration-700 group-hover:-translate-x-[600px] group-hover:translate-y-64"
        />
      </div> */
    // </div>
  );
};

export default AirplaneImages;
