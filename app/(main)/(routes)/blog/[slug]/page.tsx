import { Post, allPosts } from "contentlayer/generated";
import { format } from "date-fns";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";

interface pageProps {
  params: { slug: string };
}

const getPostFromParams = async (slug: string) => {
  const post = allPosts.find((post) => post.slug === slug);

  if (!post) notFound();

  return post;
};

const BlogPostPage = async ({ params }: pageProps) => {
  const post: Post = await getPostFromParams(params.slug);

  return (
    <div className="mx-auto my-20 flex max-w-screen-lg flex-col gap-y-10 px-10">
      <div className="flex flex-col gap-6">
        <h1 className="text-3xl font-semibold">{post.title}</h1>
        <div className="space-y-1">
          <span className="text-sm text-muted-foreground">
            {format(new Date(post.date!), "MMMM dd, yyyy")}
          </span>
          <div className="flex w-full items-center justify-between">
            <span>{post.authors}</span>
          </div>
          <h3>{post.description}</h3>
        </div>
      </div>
      {/* <div dangerouslySetInnerHTML={{ __html: post.body.html }} /> */}
      <ReactMarkdown children={post.body.raw} />
    </div>
  );
};

export default BlogPostPage;
