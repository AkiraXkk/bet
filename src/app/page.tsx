'use client';

import { useState } from 'react';
import events from '@/data/events.json';
import EventCard from '@/components/EventCard';
import SportsBanner from '@/components/SportsBanner';
import CategoryNav from '@/components/CategoryNav';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filtered = selectedCategory === 'all'
    ? events
    : events.filter((e) => e.category === selectedCategory);

  const liveCount = events.filter((e) => e.isLive).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <SportsBanner />
      <CategoryNav
        selected={selectedCategory}
        onChange={setSelectedCategory}
        liveCount={liveCount}
        totalCount={filtered.length}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}
