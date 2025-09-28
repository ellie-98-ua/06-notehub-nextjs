"use client";

interface ContentProps {
  text: string;
}

export default function Content({ text }: ContentProps) {
  return <p>{text}</p>;
}