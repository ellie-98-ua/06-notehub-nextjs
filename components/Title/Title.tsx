"use client";

interface TitleProps {
  text: string;
}

export default function Title({ text }: TitleProps) {
  return <h2>{text}</h2>;
}