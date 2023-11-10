"use client";
import Image from "next/image";

interface BlogCardProps {
  href: string;
  title: string;
  description: string;
  imageUrl?: string;
}

const BlogCard = ({ href, description, title, imageUrl }: BlogCardProps) => {
  return (
    <a href={href} className="flex flex-col space-y-2 max-md:items-center">
      {imageUrl && (
        <div className="relative h-[230px] w-[300px] border bg-white">
          <Image
            src={imageUrl}
            className="h-full w-full object-cover"
            alt={title}
          />
        </div>
      )}
      <h1 className="text-xl font-medium">{title}</h1>
      <p className="text-sm text-muted-foreground">{description}</p>
    </a>
  );
};

export default BlogCard;
