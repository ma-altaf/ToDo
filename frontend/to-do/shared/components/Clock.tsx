"use client";

import { useEffect, useState } from "react";

export default function Clock() {
  const [hour, setHour] = useState(new Date().getHours());
  const [minute, setMinute] = useState(new Date().getMinutes());
  const [second, setSecond] = useState(new Date().getSeconds());

  useEffect(() => {
    const ticker = setInterval(() => {
      const time = new Date();
      setHour(time.getHours());
      setMinute(time.getMinutes());
      setSecond(time.getSeconds());
    }, 1000);

    return () => {
      clearInterval(ticker);
    };
  }, []);

  function padding(value: number): string {
    if (value < 10) {
      return `0${value}`;
    }
    return `${value}`;
  }

  return (
    <span className="m-10">
      <div className="text-8xl flex mb-4">
        <p>{padding(hour)}</p>:<p>{padding(minute)}</p>
      </div>
      <SecondBar second={second} />
    </span>
  );
}

function SecondBar({ second }: { second: number }) {
  return (
    <div className="rounded-full h-2 m-0 w-full flex items-center justify-center border-foreground border-r-2 border-l-2">
      <div
        className="rounded-full h-1 m-0 w-full bg-foreground duration-300"
        style={{ width: `${(second / 60) * 100}%` }}
        suppressHydrationWarning
      ></div>
    </div>
  );
}
