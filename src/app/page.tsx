"use client";
import UserTypings from "@/components/UserTypings";
import Results from "@/components/results";
import useEngine from "@/hooks/useEngine";
import { calculateAccuracyPercentage } from "@/utils/helpers";
import React from "react";

export default function Home() {
  const { state, words, timeLeft, typed, errors, restart, totalTyped } =
    useEngine();

  return (
    <div className=" bg-[#1B2435] h-screen  flex flex-col items-center justify-center ">
      {/* <CountdownTimer time={timeLeft} /> */}
      <WordsContainer>
        <GenerateWords words={words} />
        {state === "start" && (
          <UserTypings
            className="absolute inset-0"
            words={words as string}
            userInput={typed}
          />
        )}
      </WordsContainer>
      <div
        className=" px-4 py-2  rounded-lg bg-slate-600 text-gray-300 font-medium cursor-pointer  "
        onClick={restart}
      >
        Reset
      </div>
      <Results
        state={state}
        className="mt-10"
        errors={errors}
        accuracy={calculateAccuracyPercentage(errors, totalTyped)}
        total={totalTyped}
      />
    </div>
  );
}

const WordsContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative max-w-3xl mt-3 text-4xl leading-relaxed">
      {children}
    </div>
  );
};

const GenerateWords = ({ words }: { words: any }) => {
  return <div className="  text-slate-400 ">{words}</div>;
};

const CountdownTimer = ({ time }: { time: number }) => {
  return (
    <div className=" text-yellow-400 font-medium text-lg text-left tracking-wider ">
      Time: {time}
    </div>
  );
};
