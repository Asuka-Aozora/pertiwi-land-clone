"use client";  
import { Button } from "@/components/ui/button";
import { sendGTMEvent } from "@next/third-parties/google";

export default function EventButton() {
  return (
    <div>
          <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => sendGTMEvent({ event: "buttonClicked", value: "xyz" })}
      >
        Send Event
          </button>
          <Button
            onClick={() => sendGTMEvent({ event: "buttonClicked", value: "xyz" })}
          >
            Send Event
          </Button>
    </div>
  );
}
