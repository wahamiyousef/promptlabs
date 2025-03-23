import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LoaderCircle } from "lucide-react";

interface ApiResponse {
  mvp_plan: string[];
}

const GenerateMVPs: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [responses, setResponses] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);

    try {
      const res = await fetch("http://localhost:8000/api/generate_mvp", {
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
      setResponses(data.mvp_plan);
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Failed to generate MVP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const prompt = params.get("prompt");

    if (prompt) {
      setInput(prompt);
      handleSubmit(); // Auto-submit the form when a prompt is passed
    }
  }, []);


  return (
    <div className="max-w-[700px] mx-auto">
      <h1 className="text-2xl font-bold mb-4">Generate MVPs</h1>
      <form onSubmit={handleSubmit} className="sm:flex w-full items-center space-x-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your idea..."
          className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-1 focus:ring-white"
        />
        <Button className="mt-2 sm:mt-0 cursor-pointer" type="submit" disabled={loading}>
          {loading ? <> <LoaderCircle className="animate-spin"/> Generating...</> : "Generate"}
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
