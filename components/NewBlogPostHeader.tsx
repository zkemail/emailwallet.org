"use client";

import { ArrowRight } from "lucide-react";
import React from "react";
import { allPosts } from "contentlayer/generated";
import { compareDesc } from "date-fns";

const NewBlogPostHeader = () => {
  const posts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.date!), new Date(b.date!)),
  );

  return (
    <div className="fixed inset-x-0 top-0 z-10 mx-auto flex w-full justify-center gap-1 bg-tertiary p-2 py-1 text-sm drop-shadow">
      <p className="text-secondary-foreground">
        The Istanbul Arbitrum mainnet experiment has concluded! Retrospective
        coming soon.
      </p>
      <a
        href={`http://docs.emailwallet.org/`}
        target="_blank"
        className="flex items-center font-bold text-slate-800"
      >
        Read docs now <ArrowRight size={15} />
      </a>
    </div>
  );
};

export default NewBlogPostHeader;
