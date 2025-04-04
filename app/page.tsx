"use client";

import { Appbar } from "./components/Appbar";
import { Button } from "@/components/ui/button";
import { ArrowRight, BriefcaseIcon, SparklesIcon, TargetIcon } from "lucide-react";
import Image from "next/image";
// bg-gradient-to-b from-background via-background to-secondary/20
export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-bl from-black via-gray-900 to-indigo-400">
      <Appbar />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <h1 className="text-5xl font-bold leading-tight bg-gradient-to-r from-pink-300 via-white to-green-200 bg-clip-text text-transparent">
              Find Your Dream Job with
              <span className=" block  bg-gradient-to-r from-pink-300 via-white to-green-200 bg-clip-text text-transparent">AI-Powered Matching</span>
            </h1>
            <p className="text-xl text-muted-foreground text-white">
              Upload your resume and let our AI match you with the perfect job opportunities tailored to your skills and experience.
            </p>
            <div className="flex gap-4">
              <Button size="lg" className="glow-border">
                Upload Resume
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="glow-border">
                Browse Jobs
              </Button>
            </div>
          </div>
          <div className="flex-1">
            <div className="glow-border rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800"
                alt="Office workers collaborating"
                width={600}
                height={400}
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center text-white mb-12">How It Works?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="glow-border bg-gradient-to-br from-pink-300 via-white to-green-200 backdrop-blur-sm p-6 rounded-lg">
            <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <BriefcaseIcon className="h-6 w-6 text-black" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-black shadow-">Upload Resume</h3>
            <p className="text-neutral-800">
              Simply upload your resume and let our AI analyze your skills and experience.
            </p>
          </div>
          <div className="glow-border bg-gradient-to-br from-pink-300 via-white to-green-200 backdrop-blur-sm p-6 rounded-lg">
            <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <SparklesIcon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-black">AI Analysis</h3>
            <p className="text-neutral-800">
              Our advanced AI analyzes job requirements and matches them with your profile.
            </p>
          </div>
          <div className="glow-border bg-gradient-to-br from-pink-300 via-white to-green-200 backdrop-blur-sm p-6 rounded-lg">
            <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <TargetIcon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-black">Perfect Match</h3>
            <p className="text-neutral-800">
              Get personalized job recommendations that perfectly match your skills.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 glow-border bg-gradient-to-br from-pink-300 via-white to-green-200 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2 text-primary">1M+</div>
              <div className="text-primary/80">Active Users</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2 text-primary">50K+</div>
              <div className="text-primary/80">Companies</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2 text-primary">100K+</div>
              <div className="text-primary/80">Jobs Posted</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2 text-primary">95%</div>
              <div className="text-primary/80">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-pink-300 via-white to-green-200 bg-clip-text text-transparent">Ready to Find Your Dream Job?</h2>
          <p className="text-xl text-white mb-8">
            Join thousands of professionals who have found their perfect career match through our AI-powered platform.
          </p>
          <Button size="lg" className="text-lg px-8 glow-border">
            Get Started Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </main>
  );
}