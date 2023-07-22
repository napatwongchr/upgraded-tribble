"use client";

import { useState, useRef, useEffect } from "react";
import YouTube, { type YouTubeProps, type YouTubePlayer } from "react-youtube";
import { MDXProvider } from "@mdx-js/react";
import mdxComponents from "@/components/mdx-components";
import { content } from "@/storage/demo-content";

import {
  findPastTimeContent,
  convertCurrentTimeToElapsed,
} from "@/utils/video";

export default function Home() {
  const [currentVideoContent, setCurrentVideoContent] = useState<
    string | React.JSX.Element
  >("");
  const [elapsed, setElapsed] = useState<string>("");
  const playerRef = useRef<YouTubePlayer | null>(null);

  useEffect(() => {
    const interval = setInterval(async () => {
      const elapsedSec = await playerRef.current?.getCurrentTime(); // this is a promise. dont forget to await
      const videoTime = convertCurrentTimeToElapsed(elapsedSec);
      setElapsed(videoTime);
    }, 100); // 100 ms refresh. increase it if you don't require millisecond precision

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const elapsedWithoutMs = elapsed.split(":").slice(0, 2).join(":");
    const videoContent = content[elapsedWithoutMs];

    if (videoContent) {
      setCurrentVideoContent(videoContent);
    }
  }, [elapsed]);

  const handlePlayerReady: YouTubeProps["onReady"] = (event) => {
    playerRef.current = event.target;
  };

  const opts: YouTubeProps["opts"] = {
    height: "0px",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  return (
    <MDXProvider components={mdxComponents}>
      <div className="flex justify-between p-2 border-b-[1px]">
        <h2 className="font-semibold">Course Name: JavaScript</h2>
      </div>
      <main className="flex justify-between h-[calc(100vh-41px)]">
        <YouTube
          videoId="rKSs2ZGlRjE"
          iframeClassName="youtube-iframe"
          style={{
            position: "relative",
            paddingTop: 25,
            height: "100%",
            width: "calc(100vw - 40vw)",
          }}
          opts={opts}
          onReady={handlePlayerReady}
          onPlay={async (e) => {
            const currentTime = await e.target.getCurrentTime();
            const videoTime = convertCurrentTimeToElapsed(currentTime)
              .split(":")
              .slice(0, 2)
              .join(":");

            const pastTimeContent = findPastTimeContent(content, videoTime);
            setCurrentVideoContent(pastTimeContent ?? "");
          }}
        />

        <div className="h-full overflow-auto w-2/5 p-4 border-l-[1px]">
          {currentVideoContent}
        </div>
      </main>
    </MDXProvider>
  );
}
