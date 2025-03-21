import os
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

class MVPRequest(BaseModel):
  idea: str

@router.post("/generate_mvp")
async def generate_mvp(request: MVPRequest):
  if not request.idea.strip():
    raise HTTPException(status_code=400, detail="Idea cannot be empty.")

  try:
    prompt = f"""
    Generate a detailed MVP plan for the following startup or hackathon idea:
    "{request.idea}"
    
    The plan should include:
    - Key features to include in the MVP
    - Development phases and steps
    - Estimated timeline for each phase (in weeks)
    
    Format the response in a clear and structured list.
    """

    completion = client.chat.completions.create(
      model="meta-llama/Llama-3.3-70B-Instruct",
      messages=[
        {"role": "system", "content": "You are an expert in product development and startup planning."},
        {"role": "user", "content": prompt}
      ],
      temperature=0.7,
      max_tokens=1000,
      top_p=0.9
    )

    response = json.loads(completion.to_json())
    mvp_plan = response['choices'][0]['message']['content']

    return {"mvp_plan": mvp_plan.split("\n")}

  except Exception as e:
    print(f"Error generating MVP plan: {e}")
    raise HTTPException(status_code=500, detail="Error generating MVP plan.")
