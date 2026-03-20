'use client';

interface CategoryNavProps {
  selected: string;
  onChange: (cat: string) => void;
  liveCount: number;
  totalCount: number;
}

const categories = [
  { id: 'all', label: 'Todos', icon: '⚡' },
  { id: 'Futebol', label: 'Futebol', icon: '⚽' },
  { id: 'Basquete', label: 'Basquete', icon: '🏀' },
  { id: 'Exploração Espacial', label: 'Exploração Espacial', icon: '🚀' },
  { id: 'Tecnologia', label: 'Tecnologia', icon: '💻' },
];

export default function CategoryNav({ selected, onChange, liveCount, totalCount }: CategoryNavProps) {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <button
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            liveCount > 0 ? 'bg-red-600 text-white' : 'bg-gray-800 text-gray-400'
          }`}
        >
          🔴 Ao Vivo ({liveCount})
        </button>
        <span className="text-sm text-gray-400">{totalCount} eventos</span>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onChange(cat.id)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              selected === cat.id
                ? 'bg-[#00ff87] text-black'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            <span>{cat.icon}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
