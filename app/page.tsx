"use client";

import { useState, useRef, useEffect } from "react";
import YouTube, { YouTubeProps, YouTubePlayer } from "react-youtube";
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
    height: "390",
    width: "640",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <YouTube
        videoId="rKSs2ZGlRjE"
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
      <div>
        <h1>Content area: {elapsed}</h1>
        <div>{currentVideoContent}</div>
      </div>
    </main>
  );
}
