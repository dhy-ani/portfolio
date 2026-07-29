import json
import os
import requests

pushover_user  = os.getenv("PUSHOVER_USER", "")
pushover_token = os.getenv("PUSHOVER_TOKEN", "")
pushover_url   = "https://api.pushover.net/1/messages.json"


def push(message: str):
    print(f"[PUSH] {message}")
    if not (pushover_user and pushover_token):
        return
    try:
        requests.post(
            pushover_url,
            data={"user": pushover_user, "token": pushover_token, "message": message},
            timeout=5,
        )
    except Exception as e:
        print(f"[PUSH ERROR] {e}")


def record_user_details(email: str, name: str = "not provided", notes: str = "not provided"):
    push(f"Portfolio visitor wants to connect\nName: {name}\nEmail: {email}\nNotes: {notes}")
    return "Recorded successfully"


def record_unknown_question(question: str):
    push(f"Unknown question on portfolio:\n{question}")
    return "Recorded successfully"


tools = [
    {
        "type": "function",
        "function": {
            "name": "record_user_details",
            "description": "Use this tool when a visitor wants to get in touch and provides their email address. Record their email and any context so Dhyani can follow up.",
            "parameters": {
                "type": "object",
                "properties": {
                    "email": {
                        "type": "string",
                        "description": "The visitor's email address",
                    },
                    "name": {
                        "type": "string",
                        "description": "The visitor's name, if they provided it",
                    },
                    "notes": {
                        "type": "string",
                        "description": "Relevant context from the conversation (what they're looking for, why they're interested, etc.)",
                    },
                },
                "required": ["email"],
                "additionalProperties": False,
            },
        },
    },
    {
        "type": "function",
        "function": {
            "name": "record_unknown_question",
            "description": "Always use this tool when you don't know the answer to a question. Record the question so Dhyani can fill in the gap.",
            "parameters": {
                "type": "object",
                "properties": {
                    "question": {
                        "type": "string",
                        "description": "The question that couldn't be answered",
                    },
                },
                "required": ["question"],
                "additionalProperties": False,
            },
        },
    },
]


_handlers = {
    "record_user_details": record_user_details,
    "record_unknown_question": record_unknown_question,
}


def handle_tool_calls(tool_calls):
    results = []
    for tc in tool_calls:
        name = tc.function.name
        args = json.loads(tc.function.arguments)
        print(f"[TOOL] {name}({args})")
        fn = _handlers.get(name)
        result = fn(**args) if fn else "Tool not found"
        results.append({
            "role": "tool",
            "content": json.dumps(result),
            "tool_call_id": tc.id,
        })
    return results
