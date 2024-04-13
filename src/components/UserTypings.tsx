"use client";
import React from "react";
import Caret from "./Caret";
import cn from "classnames";

const UserTypings = ({
  userInput,
  className,
  words,
}: {
  userInput: string;
  className?: string;
  words: string;
}) => {
  const typedCharacters = userInput.split("");

  return (
    <div className={className}>
      {typedCharacters.map((char, index) => {
        return (
          <Character
            key={`${char}_${index}`}
            actual={char}
            expected={words[index]}
          />
        );
      })}
      <Caret />
    </div>
  );
};

const Character = ({
  actual,
  expected,
}: {
  actual: string;
  expected: string;
}) => {
  const isCorrect = actual === expected;
  const isWhitespace = expected === " ";
  return (
    <span
      className={cn({
        "text-red-400": !isCorrect && !isWhitespace,
        "text-lime-400": isCorrect && !isWhitespace,
        "bg-red-500/60": !isCorrect && isWhitespace,
      })}
    >
      {expected}
    </span>
  );
};

export default UserTypings;
