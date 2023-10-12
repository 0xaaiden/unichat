import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const ETHEREUM_ADDRESS_PATTERN = /0x[a-fA-F0-9]{40}/g;

// Function to wrap Ethereum addresses in markdown link syntax
const preprocessContent = (content: string) => {
  return content.replace(ETHEREUM_ADDRESS_PATTERN, (match) => {
    return `[${match}](https://oku.trade/info/ethereum/pool/${match})`;
  });
};

const MarkdownRenderer = ({ content }: { content: string }) => {
  const processedContent = preprocessContent(content);

  return (
    <ReactMarkdown
      className="prose mt-1 w-full overflow-auto break-words prose-p:leading-relaxed"
      remarkPlugins={[remarkGfm]}
      components={{
        a: (props) => (
          <a {...props} target="_blank" rel="noopener noreferrer" />
        ),
      }}
    >
      {processedContent}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;
