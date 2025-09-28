"use client";

interface CreatedAtProps {
  date: string;
}

export default function CreatedAt({ date }: CreatedAtProps) {
  return <p>{date}</p>;
}