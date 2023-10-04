"use client";

import Link from "next/link";

interface BlogCardProps {
  href: string;
  title: string;
  description: string;
}

const BlogCard = ({ href, description, title }: BlogCardProps) => {
  return (
    <Link href={href} className="flex flex-col space-y-2 max-md:items-center">
      <div className="relative h-[230px] w-[300px] border bg-white" />
      <h1 className="text-xl font-medium">{title}</h1>
      <p className="text-sm text-muted-foreground">{description}</p>
    </Link>
  );
};

export default BlogCard;
