//@ts-nocheck

"use client";

import { FaCoins } from "react-icons/fa";
import { MdWork } from "react-icons/md";
import { IoMdCodeWorking } from "react-icons/io";
import { TbDatabaseDollar } from "react-icons/tb";
import InfoGraphLg from "./_components/InfoGraghLg";
import InfoGraphSm from "./_components/InfoGraphSm";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { StarIcon } from "lucide-react";

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
        Email Wallet is an open source public good that defines a permissionless
        system by which anyone can onboard onto crypto via emails. Each
        component including smart contracts and relayers are as decentralized as
        possible.
      </p>
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
      <div className="mx-auto flex flex-col items-center px-6">
        <h1 className="mb-8 w-[80%] text-center text-3xl font-semibold md:text-5xl md:leading-snug">
          Story
        </h1>
        <VerticalTimeline
          lineColor={resolvedTheme === "dark" ? "white" : "darkgray"}
        >
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date={"November 2023 - present"}
            iconStyle={{
              background: resolvedTheme === "dark" ? "#0f172a" : "#feead9",
              color: resolvedTheme === "dark" ? "white" : "gray",
            }}
            dateClassName="text-primary"
            icon={<FaCoins />}
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
            <h3 className="text-lg font-semibold text-primary">
              Email Wallet V1
            </h3>
            <h4 className="mb-4 text-primary">Istanbul, Turkey</h4>
            <span className="text-sm text-muted-foreground">
              Built by Sora, Yush, Saleel, Rasul, and Elo, a 2-week experiment
              for the decentralized email wallet V1 contracts is audited and
              deployed on Arbitrum Mainnet.
            </span>
            <br />
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date="May 2023"
            iconStyle={{
              background: resolvedTheme === "dark" ? "#0f172a" : "#feead9",
              color: resolvedTheme === "dark" ? "white" : "gray",
            }}
            dateClassName="text-primary"
            icon={<MdWork />}
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
            <h3 className="text-lg font-semibold text-primary">
              ZK Email SDKs and Email Wallet MVP Deployed
            </h3>
            <h4 className="mb-4 text-primary">Zuzalu/Tokyo/Vietnam</h4>
            <span className="text-sm text-muted-foreground">
              Sora and Yush, along with help from PSE and 0xPARC, finish MVPs of
              the circom + halo2 zk email SDK and the email wallet V0.
            </span>
            <br />
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date="December 2022"
            iconStyle={{
              background: resolvedTheme === "dark" ? "#0f172a" : "#feead9",
              color: resolvedTheme === "dark" ? "white" : "gray",
            }}
            icon={<TbDatabaseDollar />}
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
            <h3 className="text-lg font-semibold text-primary">
              Email Wallet Invented
            </h3>
            <h4 className="mb-4 text-primary">IEEE Dubai</h4>
            <span className="text-sm text-muted-foreground">
              <a
                href="https://arxiv.org/abs/2312.04173"
                target="_blank"
                rel="noopener noreferrer"
              >
                Sora Suegami&apos;s paper
              </a>{" "}
              describing a smart contract wallet controlled by emails is
              accepted to IEEE, based on his halo2 RSA circuits.
            </span>
            <br />
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date="Summer 2022"
            iconStyle={{
              background: resolvedTheme === "dark" ? "#0f172a" : "#feead9",
              color: resolvedTheme === "dark" ? "white" : "gray",
            }}
            dateClassName="text-primary"
            icon={<IoMdCodeWorking />}
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
            <h3 className="text-lg font-semibold text-primary">
              ZK Email Invented
            </h3>
            <h4 className="mb-4 text-primary">New York, NY</h4>
            <span className="text-sm text-muted-foreground">
              Sampriti Panda and Yush G create, compile, and run the first-ever
              zk-email circuit at the infamous New York 0xPARC residency.
            </span>
            <br />
          </VerticalTimelineElement>
          <VerticalTimelineElement
            iconStyle={{ background: "rgb(16, 204, 82)", color: "#fff" }}
            icon={<StarIcon />}
          />
        </VerticalTimeline>
      </div>
    </section>
  );
};

export default AboutPage;
