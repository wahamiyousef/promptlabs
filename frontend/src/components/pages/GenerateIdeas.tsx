import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, LoaderCircle } from "lucide-react";
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
    "Llama 3.3",
    "DeepSeek V3",
    "DeepSeek R1",
    "GPT-4",
    "Claude 3",
    "Mistral 7B"
  ]
  const models_dict = {
    "Llama 3.3":['meta-llama/Llama-3.3-70B-Instruct'],
    "DeepSeek V3":['deepseek-ai/DeepSeek-V3'],
    "DeepSeek R1":['deepseek-ai/DeepSeek-R1'],
  } as const;
  type ModelKey = keyof typeof models_dict;
  const [selectedModel, setSelectedModel] = useState<ModelKey>("Llama 3.3");

  const sendToGenerateMVP = (idea: string) => {
    navigate(`/generate/mvps?prompt=${encodeURIComponent(idea)}`);
  };


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
        body: JSON.stringify({ idea: input, model: models_dict[selectedModel][0] }),
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
                  key={model} 
                  onClick={() => setSelectedModel(model)}
                  className={selectedModel === model ? "bg-gray-100 dark:bg-gray-600 font-semibold" : ""}
                >
                  {model}
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
