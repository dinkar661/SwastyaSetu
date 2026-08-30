const {GoogleGenAI} = require('@google/genai');

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENAI_API_KEY
});

const performTriage = async ({age,symptoms}) => {
  const prompt = `
You are an AI-assisted healthcare triage
support tool.

You MUST NOT diagnose the patient or prescribe
medication.

Given the patient's age and symptoms, classify
the urgency as:

ROUTINE
URGENT
EMERGENCY

Identify possible red-flag symptoms and suggest
the appropriate level of healthcare attention.

Patient age:
${age}

Symptoms:
${symptoms.join(", ")}

Return JSON only:

{
  "priority": "ROUTINE | URGENT | EMERGENCY",
  "redFlags": [],
  "recommendedAction": ""
}
`;

  const response = await ai.models.generateContent({
    model: "gemini-3.6-flash",
    contents: prompt
  });

  return JSON.parse(response.text);
};

module.exports = {
  performTriage
};