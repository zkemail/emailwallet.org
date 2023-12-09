"use client";

import { ParallaxProvider as Provider } from "react-scroll-parallax";

const ParallaxProvider = ({ children }: { children: React.ReactNode }) => {
  return <Provider>{children}</Provider>;
};

export default ParallaxProvider;
