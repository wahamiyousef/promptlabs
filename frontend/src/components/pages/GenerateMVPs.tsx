import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const GenerateMVPs = () => {
  const [input, setInput] = useState("");
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);

    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      const newResponses = [
        `${input} - Option 1`,
        `${input} - Option 2`,
        `${input} - Option 3`,
      ];
      setResponses(newResponses);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="max-w-[700px] mx-auto ">
      <h1 className="text-2xl font-bold mb-4">Generate MVPs</h1>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your idea..."
          className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-1 focus:ring-white"
        />
        <Button type="submit" disabled={loading}>
          {loading ? "Generating..." : "Send"}
        </Button>
      </form>

      <div className="mt-6 space-y-2">
        {responses.map((response, index) => (
          <Card
            key={index}
            onClick={() => alert(`You selected: ${response}`)}
            className="cursor-pointer hover:bg-gray-100 transition"
          >
            <CardContent className="p-3">{response}</CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default GenerateMVPs;
