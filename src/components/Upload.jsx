"use client";

import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { predict } from "@/lib/predict";

const UploadImage = () => {
  const [dragActive, setDragActive] = useState(false);
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef(null);

  // Clean up object URLs to prevent browser memory leaks
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const processFile = (selectedFile) => {
    if (selectedFile && selectedFile.type.startsWith("image/")) {
      // Clean up previous preview URL if it exists
      if (preview) URL.revokeObjectURL(preview);

      setFileName(selectedFile.name);
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setResult(null);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const droppedFile = e.dataTransfer.files[0];
    processFile(droppedFile);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    processFile(selectedFile);
  };

  const handlePredict = async () => {
    if (!file) return;
    setLoading(true);
    try {
      const prediction = await predict(file);
      setResult(prediction);
    } catch (err) {
      setResult("Prediction failed");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    if (preview) URL.revokeObjectURL(preview);
    setFileName("");
    setFile(null);
    setPreview(null);
    setResult(null);
    setLoading(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const onBrowseClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card
      className={`w-full max-w-lg mx-auto p-4 border-dashed border-2 rounded-2xl transition-all duration-300 ${
        dragActive ? "border-blue-500 bg-purple-950/20" : "border-muted"
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <CardContent className="flex flex-col items-center justify-center gap-4pt-6">
        {file && preview ? (
          <div className="flex flex-col justify-center items-center gap-2w-full">
            <img
              src={preview}
              alt="Uploaded Preview"
              className="mt-2 max-h-64 rounded-lg object-contain w-full"
            />
            {fileName && (
              <p className="text-sm text-muted-foreground mt-1">
                Selected file:{" "}
                <span className="font-medium text-foreground">{fileName}</span>
              </p>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-3 py-6 w-full text-center">
            <svg
              className="h-20 w-20 fill-muted-foreground/70"
              viewBox="0 0 640 512"
            >
              <path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z"></path>
            </svg>

            <p className="text-lg font-medium text-foreground">
              Drag & drop your image here
            </p>
            <span className="text-sm text-muted-foreground">or</span>

            <Button type="button" variant="outline" onClick={onBrowseClick}>
              Browse file
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        )}

        {/* Dynamic Interactive Action Footer */}
        {file && (
          <div className="flex w-full gap-4 justify-center mt-2 border-t pt-4">
            {result !== "Prediction failed" && (
              <Button
                onClick={handlePredict}
                disabled={loading}
                className="w-32"
              >
                {loading ? "Predicting..." : "Predict"}
              </Button>
            )}
            <Button
              onClick={handleReset}
              disabled={loading}
              variant="destructive"
              className="w-32"
            >
              Reset
            </Button>
          </div>
        )}

        {/* Metrics/Inference Parsing Output block */}
        {result && (
          <div className="flex flex-col items-center justify-center mt-2 w-full p-3 bg-muted/40 rounded-xl space-y-1.5 animate-in fade-in duration-200">
            {result === "Prediction failed" ? (
              <p className="text-sm font-semibold text-destructive text-center py-1">
                Prediction failed. Please try re-uploading.
              </p>
            ) : (
              <>
                <p className="text-sm font-medium text-muted-foreground">
                  Prediction:{" "}
                  <span className="text-base font-bold text-foreground ml-1">
                    {result.prediction}
                  </span>
                </p>
                <p className="text-sm font-medium text-muted-foreground">
                  Confidence:{" "}
                  <span className="text-base font-bold text-foreground ml-1">
                    {result.prediction === "Cat"
                      ? `${((1 - result.confidence) * 100).toFixed(2)}%`
                      : `${(result.confidence * 100).toFixed(2)}%`}
                  </span>
                </p>
              </>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UploadImage;
