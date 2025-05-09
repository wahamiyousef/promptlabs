import os
import re
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from openai import OpenAI
from dotenv import load_dotenv
import json

load_dotenv()

router = APIRouter()

client = OpenAI(
  base_url="https://api.studio.nebius.ai/v1/",
  api_key=os.environ.get("NEBIUS_API_KEY")
)

class IdeaRequest(BaseModel):
  idea: str

@router.post("/generate_ideas")
async def generate_ideas(request: IdeaRequest):
  if not request.idea.strip():
    raise HTTPException(status_code=400, detail="Idea cannot be empty.")

  try:
    prompt2 = f'''Generate 3 innovative and commercially viable startup or hackathon project ideas that address real-world problems based on this concept: {request.idea}
      
      For each idea, provide:
      1. A compelling name and one-sentence pitch
      2. The specific problem it solves and target audience
      3. Key technical components and implementation challenges
      4. Potential monetization strategy or impact metrics
      5. What would make this idea stand out to investors or judges

      Ensure ideas span different domains (e.g., healthcare, sustainability, education) and include both near-term feasible implementations and ambitious moonshots. Format as a numbered list with clear section breaks.
      
      Respond with only 3 messages with the ideas, nothing more.
    '''

    prompt = f"Generate 3 innovative startup or hackathon ideas based on the following concept:\n{request.idea}\n\nFormat them as a numbered list with a brief explanation for each."

    completion = client.chat.completions.create(
      model="meta-llama/Llama-3.3-70B-Instruct",
      messages=[
        {"role": "system", "content": "You are an expert at generating creative and innovative startup ideas."},
        {"role": "user", "content": prompt}
      ],
      temperature=0.7,
      max_tokens=500,
      top_p=0.9
    )

    response = json.loads(completion.to_json())
    ideas = response['choices'][0]['message']['content']
    cleaned_ideas = [
      re.sub(r"^\d+\.\s\*\*(.*?)\*\*", r"\1", idea).strip()
      for idea in ideas.split("\n")[1:]
      if idea.strip() != ""
    ]
    return {"ideas": cleaned_ideas}

  except Exception as e:
    print(f"Error generating ideas: {e}")
    raise HTTPException(status_code=500, detail="Error generating ideas.")

