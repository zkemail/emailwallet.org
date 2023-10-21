import { defineDocumentType, makeSource } from "contentlayer/source-files";
import rehypeAutoLinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

/** @type {import('contentlayer/source-files').ComputedFields} */

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `posts/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    date: {
      type: "date",
    },
    slug: {
      type: "string",
    },
    authors: {
      type: "list",
      of: { type: "string" },
    },
    draft: {
      type: "boolean",
    },
    category: {
      type: "string",
    },
    tags: {
      type: "list",
      of: { type: "string" },
    },
    description: {
      type: "string",
    },
    published: {
      type: "boolean",
      default: true,
    },
    aliases: {
      type: "list",
      of: { type: "string" },
    },
    math: {
      type: "boolean",
    },
  },
  computedFields: {
    url: { type: "string", resolve: (post) => `/${post._raw.flattenedPath}` },
  },
}));

export default makeSource({
  contentDirPath: "content",
  documentTypes: [Post],
  mdx: {
    remarkPlugins: [remarkGfm, remarkMath],
    rehypePlugins: [
      rehypeKatex,
      rehypeSlug,
      [
        rehypePrettyCode,
        {
          theme: "github-dark",
          onVisitLine(node) {
            if (node.children.length === 0) {
              node.children = [{ type: "text", value: " " }];
            }
          },
          onVisitHighlightedLine(node) {
            node.properties.className.push("line--highlighted");
          },
          onVisitHighlightedWord(node) {
            node.properties.className = ["word--highlighted"];
          },
        },
      ],
      [
        rehypeAutoLinkHeadings,
        {
          properties: {
            className: ["subheading-anchor"],
            arieaLabel: "Link to section",
          },
        },
      ],
    ],
  },
});
