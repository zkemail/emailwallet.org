import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import { allPosts } from "contentlayer/generated";
import { compareDesc } from "date-fns";

const NewBlogPostHeader = () => {
  const posts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.date!), new Date(b.date!)),
  );

  return (
    <div className="fixed z-10 mx-auto flex w-full justify-center gap-1 bg-tertiary py-1 text-sm drop-shadow">
      <p className="text-secondary-foreground">
        We&apos;ve dropped a new blog post.
      </p>
      <Link
        href={`/blog/${posts[0].slug}`}
        className="flex items-center font-bold text-slate-800"
      >
        Read now <ArrowRight size={15} />
      </Link>
    </div>
  );
};

export default NewBlogPostHeader;
