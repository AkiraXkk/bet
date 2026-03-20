'use client';

import { useBetSlipStore } from '@/store/betSlipStore';

interface Event {
  id: string;
  title: string;
  category: string;
  homeTeam?: string | null;
  awayTeam?: string | null;
  homeOdds?: number | null;
  drawOdds?: number | null;
  awayOdds?: number | null;
  isLive: boolean;
  isFeatured: boolean;
}

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  const { addSelection } = useBetSlipStore();

  const handleOddClick = (team: string, odds: number) => {
    addSelection({ eventId: event.id, eventTitle: event.title, odds, team });
  };

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 hover:border-gray-500 transition-colors">
      <div className="flex items-center gap-2 mb-2">
        {event.isLive && (
          <span className="bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded animate-pulse">AO VIVO</span>
        )}
        {event.isFeatured && (
          <span className="bg-yellow-500 text-black text-xs font-bold px-2 py-0.5 rounded">TOP</span>
        )}
        <span className="text-xs text-gray-400">{event.category}</span>
      </div>

      <div className="mb-3">
        <h3 className="text-sm font-semibold text-white mb-1 truncate">{event.title}</h3>
        {event.homeTeam && event.awayTeam && (
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span className="truncate max-w-[35%]">{event.homeTeam}</span>
            <span className="text-gray-600 font-bold">VS</span>
            <span className="truncate max-w-[35%] text-right">{event.awayTeam}</span>
          </div>
        )}
      </div>

      <div className="flex gap-2">
        {event.homeOdds && event.homeTeam && (
          <button
            onClick={() => handleOddClick(event.homeTeam!, event.homeOdds!)}
            className="flex-1 flex flex-col items-center bg-gray-700 hover:bg-gray-600 rounded-lg py-2 px-1 transition-colors group"
          >
            <span className="text-xs text-gray-400 truncate w-full text-center">{event.homeTeam?.split(' ')[0]}</span>
            <span className="text-sm font-bold text-[#00ff87] group-hover:text-white">{event.homeOdds.toFixed(2)}</span>
          </button>
        )}
        {event.drawOdds && (
          <button
            onClick={() => handleOddClick('Empate', event.drawOdds!)}
            className="flex-1 flex flex-col items-center bg-gray-700 hover:bg-gray-600 rounded-lg py-2 px-1 transition-colors group"
          >
            <span className="text-xs text-gray-400">Empate</span>
            <span className="text-sm font-bold text-[#00ff87] group-hover:text-white">{event.drawOdds.toFixed(2)}</span>
          </button>
        )}
        {event.awayOdds && event.awayTeam && (
          <button
            onClick={() => handleOddClick(event.awayTeam!, event.awayOdds!)}
            className="flex-1 flex flex-col items-center bg-gray-700 hover:bg-gray-600 rounded-lg py-2 px-1 transition-colors group"
          >
            <span className="text-xs text-gray-400 truncate w-full text-center">{event.awayTeam?.split(' ')[0]}</span>
            <span className="text-sm font-bold text-[#00ff87] group-hover:text-white">{event.awayOdds.toFixed(2)}</span>
          </button>
        )}
      </div>
    </div>
  );
}
