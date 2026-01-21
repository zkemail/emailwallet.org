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
    <div className="sticky inset-x-0 top-0 z-10 mx-auto mb-2 flex w-full justify-center gap-1 bg-tertiary p-2 py-1 text-sm drop-shadow">
      <p className="px-4 py-2 text-secondary-foreground sm:py-0">
      This project has been deprecated, you can checkout the demo at
      </p>
      <a
        href={`https://www.youtube.com/watch?v=qUYBja0glio`}
        target="_blank"
        className="flex items-center font-bold text-slate-800"
      >
        Watch demo <ArrowRight size={15} />
      </a>
    </div>
  );
};

export default NewBlogPostHeader;
