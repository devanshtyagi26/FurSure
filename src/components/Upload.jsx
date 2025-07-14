"use client";

import React, { useCallback, useState, DragEvent } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const UploadImage = () => {
  const [dragActive, setDragActive] = useState(false);
  const [fileName, setFileName] = useState("");

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setFileName(file.name);
      // You can call an upload function here
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      // You can call an upload function here
    }
  };

  return (
    <Card
      className={`w-full max-w-lg mx-auto p-4 border-dashed border-2 rounded-2xl transition-all duration-300 ${
        dragActive ? "border-blue-500 bg-purple-950" : "border-muted"
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <CardContent className="flex flex-col items-center justify-center gap-4">
        <svg
          className="h-[7rem] fill-muted-foreground"
          height="1em"
          viewBox="0 0 640 512"
        >
          <path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z"></path>
        </svg>

        <p className="text-xl font-semibold text-muted-foreground">
          Drag & drop your image here
        </p>
        <p className="text-muted-foreground">or</p>

        <label htmlFor="file-upload">
          <Button asChild variant="outline">
            <span>Browse file</span>
          </Button>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>

        {fileName && (
          <p className="text-sm text-muted-foreground">
            Selected file: <span className="font-medium">{fileName}</span>
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default UploadImage;
