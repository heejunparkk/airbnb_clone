"use client";

import { useState } from "react";

export default function NavTabs() {
  const [activeTab, setActiveTab] = useState("stays");

  return (
    <div className="flex gap-6">
      <button
        type="button"
        onClick={() => setActiveTab("stays")}
        className={`pb-2 ${
          activeTab === "stays"
            ? "border-b-2 border-black text-black"
            : "text-gray-500"
        }`}
      >
        숙소
      </button>
      <button
        type="button"
        onClick={() => setActiveTab("experiences")}
        className={`pb-2 ${
          activeTab === "experiences"
            ? "border-b-2 border-black text-black"
            : "text-gray-500"
        }`}
      >
        체험
      </button>
    </div>
  );
}
