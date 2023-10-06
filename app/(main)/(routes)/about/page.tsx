"use client";

import { SchoolIcon, StarIcon, Workflow } from "lucide-react";
import InfoGraphLg from "./components/InfoGraghLg";
import InfoGraphSm from "./components/InfoGraphSm";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { format } from "date-fns";

const AboutPage = () => {
  const { resolvedTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <section className="mx-auto flex max-w-screen-xl flex-col items-center gap-y-20 py-20">
      <h1 className="text-5xl font-semibold">About Us</h1>
      <p className="w-2/3 text-center text-muted-foreground">
        Dolore dolore eu enim eiusmod ea laboris aliqua sunt qui. Anim sint
        dolore reprehenderit magna eiusmod ipsum mollit sint ullamco sint
        excepteur sunt non veniam. Aliquip eiusmod aliqua enim ipsum excepteur
        incididunt.
      </p>
      <VerticalTimeline
        lineColor={resolvedTheme === "dark" ? "white" : "darkgray"}
      >
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          date={format(new Date(), "yyyy") + " - present"}
          iconStyle={{
            background: resolvedTheme === "dark" ? "#0f172a" : "#feead9",
            color: resolvedTheme === "dark" ? "white" : "gray",
          }}
          icon={<Workflow />}
          contentStyle={{
            background: resolvedTheme === "dark" ? "#0f172a" : "#feead9",
            color: "#fff",
          }}
          contentArrowStyle={{
            borderRight: `7px solid ${
              resolvedTheme === "dark" ? "#0f172a" : "#feead9"
            }`,
          }}
        >
          <h3 className="text-lg font-semibold text-primary">Art Director</h3>
          <h4 className="mb-4 text-primary">San Francisco, CA</h4>
          <span className="text-sm text-muted-foreground">
            Creative Direction, User Experience, Visual Design, SEO, Online
            Marketing
          </span>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          date="2021 - 2022"
          iconStyle={{
            background: resolvedTheme === "dark" ? "#0f172a" : "#feead9",
            color: resolvedTheme === "dark" ? "white" : "gray",
          }}
          icon={<Workflow />}
          contentStyle={{
            background: resolvedTheme === "dark" ? "#0f172a" : "#feead9",
            color: "#fff",
          }}
          contentArrowStyle={{
            borderRight: `7px solid ${
              resolvedTheme === "dark" ? "#0f172a" : "#feead9"
            }`,
          }}
        >
          <h3 className="text-lg font-semibold text-primary">Art Director</h3>
          <h4 className="mb-4 text-primary">San Francisco, CA</h4>
          <span className="text-sm text-muted-foreground">
            Creative Direction, User Experience, Visual Design, SEO, Online
            Marketing
          </span>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          date="2018 - 2020"
          iconStyle={{
            background: resolvedTheme === "dark" ? "#0f172a" : "#feead9",
            color: resolvedTheme === "dark" ? "white" : "gray",
          }}
          icon={<Workflow />}
          contentStyle={{
            background: resolvedTheme === "dark" ? "#0f172a" : "#feead9",
            color: "#fff",
          }}
          contentArrowStyle={{
            borderRight: `7px solid ${
              resolvedTheme === "dark" ? "#0f172a" : "#feead9"
            }`,
          }}
        >
          <h3 className="text-lg font-semibold text-primary">Art Director</h3>
          <h4 className="mb-4 text-primary">San Francisco, CA</h4>
          <span className="text-sm text-muted-foreground">
            Creative Direction, User Experience, Visual Design, SEO, Online
            Marketing
          </span>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          date="2015 - 2018"
          iconStyle={{
            background: resolvedTheme === "dark" ? "#0f172a" : "#feead9",
            color: resolvedTheme === "dark" ? "white" : "gray",
          }}
          icon={<Workflow />}
          contentStyle={{
            background: resolvedTheme === "dark" ? "#0f172a" : "#feead9",
            color: "#fff",
          }}
          contentArrowStyle={{
            borderRight: `7px solid ${
              resolvedTheme === "dark" ? "#0f172a" : "#feead9"
            }`,
          }}
        >
          <h3 className="text-lg font-semibold text-primary">Art Director</h3>
          <h4 className="mb-4 text-primary">San Francisco, CA</h4>
          <span className="text-sm text-muted-foreground">
            Creative Direction, User Experience, Visual Design, SEO, Online
            Marketing
          </span>
        </VerticalTimelineElement>

        <VerticalTimelineElement
          iconStyle={{ background: "rgb(16, 204, 82)", color: "#fff" }}
          icon={<StarIcon />}
        />
      </VerticalTimeline>

      <div className="mx-auto flex flex-col items-center px-6">
        <h1 className="mb-8 w-[80%] text-center text-3xl font-semibold md:text-5xl md:leading-snug">
          Secured by Advanced Cryptography
        </h1>
        <h3 className="text-center text-muted-foreground">
          Secured by zero knowledge proofs on Ethereum. Private by default.
        </h3>
        <InfoGraphLg />
        <InfoGraphSm />
      </div>
    </section>
  );
};

export default AboutPage;
