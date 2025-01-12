'use client';

import { useState } from 'react';

export default function NavTabs() {
  const [activeTab, setActiveTab] = useState('stays');

  return (
    <div className="flex">
      <button
        type="button"
        onClick={() => setActiveTab('stays')}
        className={`px-4 py-2 ${
          activeTab === 'stays'
            ? 'hidden md:block text-black hover:bg-gray-100 rounded-full'
            : 'text-gray-500'
        }`}
      >
        숙소
      </button>
      <button
        type="button"
        onClick={() => setActiveTab('experiences')}
        className={`px-4 py-2 ${
          activeTab === 'experiences'
            ? 'hidden md:block text-black hover:bg-gray-100 rounded-full'
            : 'text-gray-500'
        }`}
      >
        체험
      </button>
    </div>
  );
}
