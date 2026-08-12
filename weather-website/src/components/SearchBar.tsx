import { useState } from 'react';

type SearchBarProps = {
  onSearch: (city: string) => void;
};

function SearchBar({ onSearch }: SearchBarProps) {
  const [draft, setDraft] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (draft.trim() === "") return;
    onSearch(draft.trim());
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-3 max-w-md mx-auto mt-6">
      <input
        type="text"
        placeholder="Search City..."
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        className="w-full max-w-md px-4 py-3 text-base rounded-xl bg-white shadow-sm 
                   border border-gray-100 text-gray-700
                   focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        type="submit"
        className="flex items-center gap-2 px-4 py-3 rounded-xl 
                   bg-blue-500 text-white text-sm font-medium 
                   hover:bg-blue-600 transition-colors"
      >
         Locate
      </button>
    </form>
  );
}

export default SearchBar;