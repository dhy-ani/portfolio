from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from openai import OpenAI
from dotenv import load_dotenv
from context import system_prompt
from tools import tools, handle_tool_calls
import os

load_dotenv(override=True)

client = OpenAI(
    api_key=os.getenv("OPENROUTER_API_KEY"),
    base_url="https://openrouter.ai/api/v1",
)
app = FastAPI(title="Dhyani Soni — Digital Twin API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)


class Message(BaseModel):
    role: str
    content: str


class ChatRequest(BaseModel):
    message: str
    history: list[Message] = []


@app.get("/")
def health():
    return {"status": "online", "twin": "Dhyani Soni"}


@app.post("/chat")
def chat(req: ChatRequest):
    messages = [{"role": "system", "content": system_prompt}]

    for m in req.history[-20:]:
        messages.append({"role": m.role, "content": m.content})

    messages.append({"role": "user", "content": req.message})

    response = client.chat.completions.create(
        model="openai/gpt-4o-mini",
        messages=messages,
        tools=tools,
        max_tokens=500,
    )

    print("[DEBUG] finish_reason:", response.choices[0].finish_reason)
    print("[DEBUG] tool_calls:", response.choices[0].message.tool_calls)

    while response.choices[0].message.tool_calls:
        msg = response.choices[0].message
        results = handle_tool_calls(msg.tool_calls)

        messages.append(msg.model_dump(exclude_unset=True))
        messages.extend(results)

        response = client.chat.completions.create(
            model="openai/gpt-4o-mini",
            messages=messages,
            tools=tools,
            max_tokens=500,
        )

        print("[DEBUG] finish_reason:", response.choices[0].finish_reason)
        print("[DEBUG] tool_calls:", response.choices[0].message.tool_calls)

    return {"response": response.choices[0].message.content}