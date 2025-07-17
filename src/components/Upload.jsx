"use client";

import React, { useState } from "react";
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
  const [reset, setReset] = useState(false);

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
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFileName(droppedFile.name);
      setFile(droppedFile);
      setPreview(URL.createObjectURL(droppedFile));
      setResult(null);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFileName(selectedFile.name);
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setResult(null);
    }
  };

  const handlePredict = async () => {
    if (!file) return;
    setLoading(true);
    try {
      const prediction = await predict(file);
      setResult(prediction);
      setReset(true);
    } catch (err) {
      setResult("Prediction failed");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  const handleReset = (e) => {
    setReset(false);
    setFileName("");
    setFile(null);
    setReset(false);
    setPreview(null);
    setLoading(false);
    setResult(null);
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
        {file && preview ? (
          <div className="flex flex-col justify-center items-center gap-2">
            <img
              src={preview}
              alt="Uploaded Preview"
              className="mt-4 max-h-64 rounded-lg object-contain"
            />
            {fileName && (
              <p className="text-sm text-muted-foreground">
                Selected file: <span className="font-medium">{fileName}</span>
              </p>
            )}
          </div>
        ) : (
          <>
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
          </>
        )}

        <div className="flex w-[100%] justify-around">
          {result === "Prediction failed" ? (
            <></>
          ) : (
            <Button
              onClick={handlePredict}
              disabled={!file || loading}
              className="mt-4"
            >
              {loading ? "Predicting..." : "Predict"}
            </Button>
          )}
          {reset && (
            <Button
              onClick={handleReset}
              disabled={!file || loading}
              className="mt-4 bg-destructive"
            >
              Reset
            </Button>
          )}
        </div>

        {result && (
          <div className="flex flex-col items-center justify-center mt-4 w-full space-y-2">
            {result === "Prediction failed" ? (
              <>
                <p className="text-md font-semibold text-destructive text-center">
                  Prediction failed. Try again.
                </p>
                <Button
                  onClick={handleReset}
                  disabled={!file || loading}
                  className="mt-4 bg-destructive"
                >
                  {loading ? "Resetting..." : "Reset"}
                </Button>
              </>
            ) : (
              <>
                <p className="text-md font-semibold text-center text-primary">
                  Prediction:
                  <span className="ml-2 text-muted-foreground">
                    {result.prediction}
                  </span>
                </p>
                <p className="text-md font-semibold text-center text-primary">
                  Confidence:
                  <span className="ml-2 text-muted-foreground">
                    {result.prediction === "Cat" ? (
                      <>{(1 - result.confidence) * 100}%</>
                    ) : (
                      <>{result.confidence * 100}%</>
                    )}
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
