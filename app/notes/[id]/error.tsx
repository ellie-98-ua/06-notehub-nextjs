"use client";

import React from "react";

interface ErrorProps {
  error: Error;
}

export default function Error({ error }: ErrorProps) {
    return (
        <p>Could not fetch note details. {error.message}</p>
    );
}