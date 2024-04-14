"use client";
import GeneratedWords from "@/components/GeneratedWords";
import RestartButton from "@/components/RestartButton";
import UserTypings from "@/components/UserTypings";
import Results from "@/components/results";
import useEngine from "@/hooks/useEngine";
import { calculateAccuracyPercentage, calculateWpm } from "@/utils/helpers";
import React, { useState } from "react";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  const { state, words, timeLeft, typed, errors, restart, totalTyped } =
    useEngine();

  return (
    <div className=" mx-auto flex flex-col items-center justify-center h-screen max-w-3xl ">
      <CountdownTimer timeLeft={timeLeft} />
      <WordsContainer>
        <GeneratedWords key={words} words={words} />
        {/* User typed characters will be overlayed over the generated words */}
        <UserTypings
          className="absolute inset-0"
          words={words}
          userInput={typed}
        />
      </WordsContainer>
      <Results
        className="mt-10"
        state={state}
        errors={errors}
        accuracyPercentage={calculateAccuracyPercentage(errors, totalTyped)}
        total={totalTyped}
        wpm={calculateWpm(errors, totalTyped)}
        onRestart={restart}
      />
      <RestartButton
        className={"mx-auto mt-10 text-slate-500"}
        onRestart={restart}
      />
    </div>
  );
}

const WordsContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative text-3xl max-w-3xl leading-relaxed break-all mt-3 w-full ">
      {children}
    </div>
  );
};

const CountdownTimer = ({ timeLeft }: { timeLeft: number }) => {
  return (
    <h2 className="text-primary-400 font-medium text-lg text-yellow-400 text-left w-full  ">
      Time: {timeLeft}
    </h2>
  );
};
