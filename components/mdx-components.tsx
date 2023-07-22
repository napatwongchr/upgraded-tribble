import CodeBlock from "@/components/codeblock";
import { type MDXComponents } from "mdx/types";

const mdxComponents: MDXComponents = {
  h1: ({ children }) => {
    return (
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        {children}
      </h1>
    );
  },
  h2: ({ children }) => {
    return (
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        {children}
      </h2>
    );
  },
  h3: ({ children }) => {
    return (
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        {children}
      </h3>
    );
  },
  h4: ({ children }) => {
    return (
      <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
        {children}
      </h4>
    );
  },
  p: ({ children }) => {
    return <p className="leading-7 [&:not(:first-child)]:mt-6">{children}</p>;
  },
  ul: ({ children }) => {
    return <ul className="my-6 ml-6 list-disc [&>li]:mt-2">{children}</ul>;
  },
  ol: ({ children }) => {
    return <ol className="my-6 ml-6 list-decimal [&>li]:mt-2">{children}</ol>;
  },
  pre: ({ children }) => {
    return <div>{children}</div>;
  },
  code: ({ children }) => {
    return <CodeBlock>{children}</CodeBlock>;
  },
  InlineCode: ({ children }) => {
    return (
      <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
        {children}
      </code>
    );
  },
  blockquote: ({ children }) => {
    return (
      <blockquote className="mt-6 border-l-2 pl-6 italic">
        {children}
      </blockquote>
    );
  },
};

export default mdxComponents;
