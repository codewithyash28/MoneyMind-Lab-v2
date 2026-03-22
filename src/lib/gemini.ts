import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "YOUR_API_KEY");

const SYSTEM_PROMPT = `
You are the MoneyMind Lab Assistant, a friendly and educational AI guide for teenagers and young adults (15-24) learning financial literacy.
Your goal is to explain basic financial concepts like budgeting, debt, credit scores, and scam prevention in a simple, engaging, and easy-to-understand way.

RULES:
1. Be simple, friendly, and educational.
2. DO NOT provide specific investment advice or legal advice. Focus on concepts.
3. Use step-by-step explanations and small examples.
4. Keep the tone encouraging and relatable to young people.
5. If you don't have the API key or if there's an error, use the fallback templates.
6. Use generic currency symbols or the user's local currency if provided.

The user's country is: {{country}}
The user's goal is: {{goal}}
`;

export async function getGeminiResponse(message: string, profile: { country: string; goal: string }) {
  try {
    if (!process.env.GEMINI_API_KEY) {
        throw new Error("No API Key");
    }
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = SYSTEM_PROMPT
      .replace("{{country}}", profile.country)
      .replace("{{goal}}", profile.goal) + `\n\nUser: ${message}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini API Error:", error);
    return getFallbackResponse(message);
  }
}

function getFallbackResponse(message: string) {
  const msg = message.toLowerCase();
  if (msg.includes("budget")) {
    return "Budgeting is like a roadmap for your money! Start by listing your income (money coming in) and your expenses (money going out). Try the 50/30/20 rule: 50% for needs, 30% for wants, and 20% for savings!";
  } else if (msg.includes("credit score")) {
    return "A credit score is like a financial GPA. It shows lenders how responsible you are with borrowed money. You can build it by paying bills on time and keeping your credit card balances low!";
  } else if (msg.includes("scam")) {
    return "Always be cautious! If an offer sounds too good to be true, it probably is. Never share your passwords or PINs, and watch out for urgent-sounding messages from 'banks' asking for personal info.";
  } else if (msg.includes("debt")) {
    return "Debt is money you owe. Not all debt is bad, but high-interest debt (like credit cards) can grow fast. It's best to pay it off as quickly as possible to avoid extra costs!";
  }
  return "That's a great question! I'm here to help you learn about money. Could you tell me more about what you're curious about, like budgeting, credit, or avoiding scams?";
}
