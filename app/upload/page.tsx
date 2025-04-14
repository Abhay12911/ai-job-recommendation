"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Upload, FileText, CheckCircle, AlertCircle } from "lucide-react";
import { Appbar } from "../components/Appbar";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const router = useRouter();

  const handleUpload = async () => {
    if (!file) {
      setStatus("error");
      setMessage("Please select a file first!");
      return;
    }

    setIsLoading(true);
    setStatus("idle");

    try {
      const formData = new FormData();
      formData.append("resume", file);

      const res = await fetch("/api/resume", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      
      if (res.ok) {
        setStatus("success");
        setMessage("Resume uploaded successfully! Redirecting to matched jobs...");
        setTimeout(() => router.push("/jobs"), 2000);
      } else {
        setStatus("error");
        setMessage(data.error || "Upload failed. Please try again.");
      }
    } catch (error) {
      setStatus("error");
      setMessage("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-bl from-black via-gray-900 to-indigo-400">
      <Appbar />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <Card className="p-8 glow-border bg-card/50 backdrop-blur-sm">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-4">Upload Your Resume</h1>
              <p className="text-white text-lg">
                Let our AI analyze your resume and find the perfect job matches for you
              </p>
            </div>

            <div className="space-y-6">
              <div className="border-2 border-dashed border-input rounded-lg p-8 text-center glow-border">
                <FileText className="h-12 w-12 mx-auto mb-4 text-primary" />
                <div className="mb-4">
                  <Input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => {
                      setFile(e.target.files?.[0] || null);
                      setStatus("idle");
                      setMessage("");
                    }}
                    className="hidden"
                    id="resume-upload"
                  />
                  <Button
                    variant="outline"
                    className="relative glow-border cursor-pointer"
                    onClick={() => document.getElementById("resume-upload")?.click()}
                  >
                    <Upload className="h-4 w-4 mr-2 cursor-pointer"/>
                    Choose File
                  </Button>
                </div>
                {file && (
                  <p className="text-sm text-muted-foreground">
                    Selected: {file.name}
                  </p>
                )}
              </div>

              <div className="flex flex-col items-center gap-4">
                <Button
                  className="w-full max-w-xs glow-border cursor-pointer"
                  onClick={handleUpload}
                  disabled={!file || isLoading}
                >
                  {isLoading ? "Uploading..." : "Upload Resume"}
                </Button>

                {message && (
                  <div className={`flex items-center gap-2 text-sm
                    ${status === "success" ? "text-green-600" : ""}
                    ${status === "error" ? "text-destructive" : ""}
                  `}>
                    {status === "success" && <CheckCircle className="h-4 w-4" />}
                    {status === "error" && <AlertCircle className="h-4 w-4" />}
                    {message}
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
}