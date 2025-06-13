// OpenAssist AI Co-Founder – Refined Layout with Icons and Prompt Cards using lucide-react and ShadCN UI

import { useState } from 'react';
import { ArrowRight, Target, Lightbulb } from 'lucide-react';

export default function OpenAssistApp() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const suggestions = [
    "I'm launching an AI app but struggling with user acquisition",
    "Should I raise money now or focus on revenue first?",
    "My co-founder and I disagree on product direction",
    "How do I know if I should pivot or keep iterating?"
  ];

  async function handleSubmit(e) {
    e.preventDefault();
    if (!input.trim()) return;
    setLoading(true);
    setResponse(null);

    const res = await fetch('/api/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input }),
    });

    const data = await res.json();
    setResponse(data.output);
    setLoading(false);
  }

  function handleSuggestionClick(text) {
    setInput(text);
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12 flex flex-col items-center text-center">
      <div className="flex flex-col items-center space-y-4 mb-10">
        <img src="/logo.svg" alt="OpenAssist Logo" className="h-12" onError={(e) => e.currentTarget.style.display='none'} />
        <p className="text-gray-600 max-w-2xl text-base sm:text-lg">
          Your AI co-founder. Get brutally honest, actionable advice from a battle-tested startup perspective.
        </p>
      </div>

      <div className="w-full max-w-3xl bg-white p-6 rounded-xl shadow mb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-gray-50 border rounded-lg p-4 text-left flex items-start space-x-3 group hover:scale-[1.02] hover:shadow-sm transition-all duration-200">
            <Target className="w-6 h-6 text-slate-600 mt-1 transition-transform duration-200 group-hover:scale-110" />
            <div>
              <h2 className="font-semibold text-lg mb-1">Direct Insights</h2>
              <p className="text-sm text-slate-600 leading-relaxed">Cut through the noise with honest, actionable advice.</p>
            </div>
          </div>
          <div className="bg-gray-50 border rounded-lg p-4 text-left flex items-start space-x-3 group hover:scale-[1.02] hover:shadow-sm transition-all duration-200">
            <Lightbulb className="w-6 h-6 text-slate-600 mt-1 transition-transform duration-200 group-hover:scale-110" />
            <div>
              <h2 className="font-semibold text-lg mb-1">Strategic Thinking</h2>
              <p className="text-sm text-gray-600">Trained on thousands of startup journeys and outcomes.</p>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h3 className="text-lg font-semibold text-black mb-4">What's on your mind?</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {suggestions.map((text, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(text)}
                className="border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
              >
                "{text}"
              </button>
            ))}
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-xl relative px-2 sm:px-0">
        <input
          type="text"
          className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black pr-12 text-base sm:text-sm"
          placeholder="Describe what you're building and where you're stuck..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button type="submit" className="absolute top-1/2 right-3 transform -translate-y-1/2 bg-black text-white p-3 rounded-md hover:bg-gray-800">
          <ArrowRight className="w-5 h-5" />
        </button>
      </form>

      {response && (
        <div className="mt-12 w-full max-w-xl bg-white p-6 rounded-lg shadow text-left">
          <pre className="whitespace-pre-wrap font-sans text-gray-800 text-sm sm:text-base">{response}</pre>
        </div>
      )}

      <p className="text-xs text-gray-400 mt-12">OpenAssist provides startup advice based on common patterns and frameworks. Always validate advice with real market feedback.</p>
    </main>
  );
}
