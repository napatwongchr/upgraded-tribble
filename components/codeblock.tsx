import { Highlight, themes, type Language } from "prism-react-renderer";
import { ClipboardDocumentIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

type CodeBlock = {
  children: React.ReactNode | string;
  className?: string;
};

const CodeBlock: React.FC<CodeBlock> = (props) => {
  const { children } = props;
  const [isCopied, setIsCopied] = useState(false);
  const code = children as string;

  const copyToClipboard = (str: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(str);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => {
          copyToClipboard(code);
          setIsCopied(true);
          setTimeout(() => setIsCopied(false), 1000);
        }}
        className="absolute right-4 top-2 flex items-center justify-end"
      >
        <div className="flex cursor-pointer p-1 text-gray-500">
          <ClipboardDocumentIcon className="w-4" />
          {isCopied ? "Copied!" : "Copy"}
        </div>
      </button>
      <Highlight theme={themes.dracula} code={code} language="tsx">
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className="rounded-lg p-5" style={style}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                <span>{i + 1}</span>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
};

export default CodeBlock;
