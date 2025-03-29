import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Gem, LoaderCircle, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";

interface ApiResponse {
  ideas: string[];
}

const GenerateIdeas: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [responses, setResponses] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const models = [
    { name: "Llama 3.3", value: "meta-llama/Llama-3.3-70B-Instruct", disabled: false },
    { name: "DeepSeek V3", value: "deepseek-ai/DeepSeek-V3", disabled: false },
    { name: "DeepSeek R1", value: "deepseek-ai/DeepSeek-R1", disabled: false },
    { name: "GPT-4", value: "openai/GPT-4", disabled: true }, // Locked for VIP only
    { name: "Claude 3", value: "anthropic/Claude-3", disabled: true }, // Locked for VIP only
    { name: "Mistral 7B", value: "mistral/Mistral-7B", disabled: false }
  ] as const;
  
  type ModelKey = (typeof models)[number]["name"];
  const [selectedModel, setSelectedModel] = useState<ModelKey>("Llama 3.3");

  const sendToGenerateMVP = (idea: string) => {
    navigate(`/generate/mvps?prompt=${encodeURIComponent(idea)}`);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);

    try {
      const model = models.find((m) => m.name === selectedModel)?.value;

      const res = await fetch("http://localhost:8000/api/generate_ideas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idea: input, model }),
      });

      if (!res.ok) {
        throw new Error(`Error: ${res.statusText}`);
      }

      const data: ApiResponse = await res.json();
      console.log("Res: ",data);
      console.log("Ideas: ", data.ideas);
      setResponses(data.ideas);
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Failed to generate ideas. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[750px] mx-auto">
      <h1 className="text-2xl font-bold mb-4 ml-7">Generate Hackathon Ideas</h1>
      {/* <form onSubmit={handleSubmit} className="flex gap-2"> */}
      <form onSubmit={handleSubmit} className="sm:flex w-full items-center space-x-2">
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">{selectedModel}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Select AI Model</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {models.map((model) => (
                <DropdownMenuItem
                  key={model.name}
                  onClick={() => !model.disabled && setSelectedModel(model.name)}
                  disabled={model.disabled}
                  className={`${
                    model.disabled
                      ? "text-gray-400 cursor-not-allowed flex justify-between"
                      : "hover:bg-gray-100 dark:hover:bg-gray-600"
                  } ${selectedModel === model.name ? "bg-gray-100 dark:bg-gray-600 font-semibold" : ""}`}
                >
                  {model.name}
                  {model.disabled && (
                    <span className="ml-2 text-sm text-gray-500 flex"><Lock /></span>
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter a theme or problem..."
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
            // onClick={() => alert(`You selected: ${response}`)}
            className="sm:flex-row items-center p-3 hover:bg-gray-200 dark:hover:bg-gray-800 transition"
          >
            <CardContent>{response}</CardContent>
            <Button
              className="h-16 cursor-pointer relative group transition duration-300"
              onClick={() => sendToGenerateMVP(response)}
              >
              Generate MVP
              <span className="absolute top-10 right-4 opacity-0 translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                <ArrowRight />
              </span>
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default GenerateIdeas;
