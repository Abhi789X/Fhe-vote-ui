import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function App() {
  const [vote, setVote] = useState<boolean | null>(null);
  const [result, setResult] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const submitVote = async (voteValue: boolean) => {
    setLoading(true);
    await fetch("http://161.97.103.11:8787/vote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ vote: voteValue }),
    });
    setVote(voteValue);
    setLoading(false);
  };

  const getResult = async () => {
    const res = await fetch("http://161.97.103.11:8787/result");
    const data = await res.json();
    setResult(data.result);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 p-8 rounded-2xl shadow-xl backdrop-blur-md"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">🗳️ FHE DAO Vote</h1>

        <div className="flex gap-4 justify-center">
          <button
            onClick={() => submitVote(true)}
            disabled={loading}
            className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-xl"
          >
            ✅ Yes
          </button>
          <button
            onClick={() => submitVote(false)}
            disabled={loading}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-xl"
          >
            ❌ No
          </button>
        </div>

        {vote !== null && (
          <p className="text-center mt-4">
            You voted <strong>{vote ? "Yes" : "No"}</strong>
          </p>
        )}

        <div className="mt-6 text-center">
          <button
            onClick={getResult}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl"
          >
            🔍 View Tally Result
          </button>
          {result !== null && (
            <p className="mt-2">✅ Total Yes Votes: {result}</p>
          )}
        </div>
      </motion.div>
    </div>
  );
}
