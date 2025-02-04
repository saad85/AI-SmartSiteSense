"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Globe, ArrowRight, Loader2 } from "lucide-react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleRedirect = () => {
    if (!url.trim()) return;

    startTransition(() => {
      const encodedUrl = encodeURIComponent(url);
      router.push(`/${encodedUrl}`);
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-900 text-white">
      {isPending ? (
        <Loader2 className="animate-spin text-white" size={40} />
      ) : (
        <>
          <h1 className="text-2xl font-semibold mb-4">
            Ask Anything About a WEBSITE
          </h1>
          <div className="flex gap-2 items-center">
            <div className="relative w-80">
              <Globe
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                size={20}
              />
              <input
                type="text"
                placeholder="Enter URL..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="border border-gray-300 px-10 py-2 rounded-lg w-80 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black"
              />
            </div>
            <button
              onClick={handleRedirect}
              className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-700 border border-white flex items-center gap-2"
            >
              Go <ArrowRight size={20} />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
