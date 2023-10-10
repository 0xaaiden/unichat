"use client";

import { useRef } from "react";
import { useChat } from "ai/react";
import va from "@vercel/analytics";
import clsx from "clsx";
import { VercelIcon, GithubIcon, LoadingCircle, SendIcon } from "./icons";
import { Bot, User } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Textarea from "react-textarea-autosize";
import { toast } from "sonner";
import aperture from "../public/aperture.svg";
import Image from "next/image";

const examples = [
  "Search all pools trading UNI and return their 24H volume, fees collected, and pairs traded",
  "Get a V3 snapshot for the pool PEPE/ETH, at address 0x11950d141ecb863f01007add7d1a342041227b58 at block  17294375",
  "What pools are trading LDO with the most liquidity?",
  "Get recent swaps for address 0x9c8b59443fd54567e33805fb389c3d9b9196ed2e",
];

export default function Chat() {
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const { messages, input, setInput, handleSubmit, isLoading } = useChat({
    onResponse: (response) => {
      if (response.status === 429) {
        toast.error("You have reached your request limit for the day.");
        va.track("Rate limited");
        return;
      } else {
        va.track("Chat initiated");
      }
    },
    onError: (error) => {
      va.track("Chat errored", {
        input,
        error: error.message,
      });
    },
  });

  const disabled = isLoading || input.length === 0;

  return (
    <main className=" flex flex-col items-center justify-between pb-40">
      <div className="absolute top-5   hidden w-full justify-between px-5 sm:flex">
        <a
          href="/"
          // target="_blank"
          className="rounded-lg  transition-colors duration-200 hover:bg-stone-100 sm:bottom-auto"
        >
          {/* <VercelIcon /> */}

          <span className="blockv2 h-8 w-auto sm:h-10">UniChat</span>
        </a>
        <a
          href="https://github.com/0xaaiden/UniChat"
          target="_blank"
          className="rounded-lg p-2 transition-colors duration-200 hover:bg-stone-100 sm:bottom-auto"
        >
          <GithubIcon />
        </a>
      </div>
      {messages.length > 0 ? (
        messages.map((message, i) => (
          <div
            key={i}
            className={clsx(
              "flex w-full items-center justify-center border-b border-gray-200 py-8",
              message.role === "user" ? "bg-white" : "bg-gray-100",
            )}
          >
            <div className="flex w-full max-w-screen-md items-start space-x-4 px-5 sm:px-0">
              <div
                className={clsx(
                  "p-1.5 text-white",
                  message.role === "assistant" ? "bg-green-500" : "bg-black",
                )}
              >
                {message.role === "user" ? (
                  <User width={20} />
                ) : (
                  <Bot width={20} />
                )}
              </div>
              <ReactMarkdown
                className="prose mt-1 w-full overflow-auto break-words prose-p:leading-relaxed"
                remarkPlugins={[remarkGfm]}
                components={{
                  // open links in new tab
                  a: (props) => (
                    <a {...props} target="_blank" rel="noopener noreferrer" />
                  ),
                }}
              >
                {message.content}
              </ReactMarkdown>
            </div>
          </div>
        ))
      ) : (
        <div className="border-gray-200sm:mx-0 mx-5 mt-20 max-w-screen-md rounded-md border sm:w-full">
          <div className="flex flex-col space-y-4 p-7 sm:p-10">
            <h1 className="text-lg font-semibold text-black">
              Welcome to UniChat!
            </h1>
            <p className="text-gray-500">
              This is an{" "}
              <a
                href="https://github.com/0xaaiden/unichat"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium underline underline-offset-4 transition-colors hover:text-black"
              >
                open-source
              </a>{" "}
              AI chatbot that uses{" "}
              <a
                href="https://platform.openai.com/docs/guides/gpt/function-calling"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium underline underline-offset-4 transition-colors hover:text-black"
              >
                OpenAI Functions
              </a>{" "}
              to interact with{" "}
              <a
                href="https://uniswap.org"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium underline underline-offset-4 transition-colors hover:text-black"
              >
                Uniswap V3
              </a>{" "}
              with natural language.
            </p>
            <p className="text-gray-500">
              You can ask it about pool snapshots, latest block data, search
              token pair pools, fetch pool liquidity, and source user-specific
              swap data.
            </p>
          </div>
          <div className="flex flex-col space-y-4 border-t border-gray-200 bg-gray-50 p-7 sm:p-10">
            {examples.map((example, i) => (
              <button
                key={i}
                className="rounded-md border border-gray-200 bg-white px-5 py-3 text-left text-sm text-gray-500 transition-all duration-75 hover:border-black hover:text-gray-700 active:bg-gray-50"
                onClick={() => {
                  setInput(example);
                  inputRef.current?.focus();
                }}
              >
                {example}
              </button>
            ))}
          </div>
        </div>
      )}
      <div className="fixed bottom-0 flex w-full flex-col items-center space-y-3 bg-gradient-to-b from-transparent via-gray-100 to-gray-100 p-5 pb-3 sm:px-0">
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="relative w-full max-w-screen-md rounded-xl border border-gray-200 bg-white px-4 pb-2 pt-3 shadow-lg sm:pb-3 sm:pt-4"
        >
          <Textarea
            ref={inputRef}
            tabIndex={0}
            required
            rows={1}
            autoFocus
            placeholder="Send a message"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                formRef.current?.requestSubmit();
                e.preventDefault();
              }
            }}
            spellCheck={false}
            className="w-full pr-10 focus:outline-none"
          />
          <button
            className={clsx(
              "absolute inset-y-0 right-3 my-auto flex h-8 w-8 items-center justify-center rounded-md transition-all",
              disabled
                ? "cursor-not-allowed bg-white"
                : "bg-green-500 hover:bg-green-600",
            )}
            disabled={disabled}
          >
            {isLoading ? (
              <LoadingCircle />
            ) : (
              <SendIcon
                className={clsx(
                  "h-4 w-4",
                  input.length === 0 ? "text-gray-300" : "text-white",
                )}
              />
            )}
          </button>
        </form>
        <p className="flex items-center justify-center  gap-2 text-center text-xs text-gray-400">
          <span className="text-md">Sponsored by</span>{" "}
          {/* Impor svg and link to aperture FInance website */}
          <a
            href="https://aperture.finance"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            <Image
              src={aperture}
              alt="Aperture Finance"
              width={120}
              height={30}
            />
          </a>
          .
        </p>
      </div>
    </main>
  );
}
