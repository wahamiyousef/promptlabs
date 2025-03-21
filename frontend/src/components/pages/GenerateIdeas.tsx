import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card"; 

interface ApiResponse {
  ideas: string[];
}

const GenerateIdeas: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [responses, setResponses] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);

    try {
      const res = await fetch("http://localhost:8000/api/generate_ideas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idea: input }),
      });

      if (!res.ok) {
        throw new Error(`Error: ${res.statusText}`);
      }

      const data: ApiResponse = await res.json();
      console.log("Res: ",data);
      setResponses(data.ideas);
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Failed to generate ideas. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[700px] mx-auto">
      <h1 className="text-2xl font-bold mb-4">Generate Startup Ideas</h1>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter a theme or problem..."
          className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-1 focus:ring-white"
        />
        <Button type="submit" disabled={loading}>
          {loading ? "Generating..." : "Generate"}
        </Button>
      </form>

      <div className="mt-6 space-y-2">
        {responses.map((response, index) => (
          <Card
            key={index}
            onClick={() => alert(`You selected: ${response}`)}
            className="cursor-pointer hover:bg-gray-400 dark:hover:bg-gray-800 transition"
          >
            <CardContent className="p-3">{response}</CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default GenerateIdeas;
