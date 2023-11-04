import BlogCard from "./_components/BlogCard";
import { allPosts } from "contentlayer/generated";
import { compareDesc } from "date-fns";

const BlogPage = () => {
  const posts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.date!), new Date(b.date!)),
  );

  return (
    <section className="mx-auto flex max-w-screen-lg justify-center max-lg:mb-24 lg:h-full">
      <div className="mx-6 my-16 flex flex-col items-center space-y-12 md:mx-10">
        <h1 className="w-fit bg-gradient-to-r from-blue-700 to-amber-500 bg-clip-text text-5xl font-semibold uppercase text-transparent">
          Blog
        </h1>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <BlogCard
            href={
              "https://docs.google.com/presentation/d/1nHW57t8SQ-NCqK366_xpkB7WuC3lFX-9/edit#slide=id.p1"
            }
            title={"Sendeth slides"}
            description={
              "Dolore mollit ipsum nulla quis non magna qui voluptate officia cillum sit amet."
            }
          />

          {posts.map((post) => (
            <BlogCard
              key={post._id}
              href={`/blog/${post.slug}`}
              title={post.title}
              description={post.description || ""}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogPage;
