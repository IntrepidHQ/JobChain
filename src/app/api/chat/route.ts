import { NextResponse } from 'next/server';
import { AGENTS, MODEL, calcCost, BUDGET_USD } from '@/lib/agents';
import { getLocalResponse, simulateUsage } from '@/lib/localResponder';

export async function POST(req: Request) {
  const { agentSlug, messages, budgetSpent } = await req.json() as {
    agentSlug: string;
    messages: { role: 'user' | 'assistant'; content: string }[];
    budgetSpent: number;
  };

  const agent = AGENTS[agentSlug];
  if (!agent) return NextResponse.json({ error: 'Unknown agent' }, { status: 400 });

  const userMessage = messages.at(-1)?.content ?? '';

  // ── No API key: use local knowledge engine ───────────────────────────
  if (!process.env.ANTHROPIC_API_KEY) {
    const content = getLocalResponse(agentSlug as 'eli' | 'nora', userMessage);
    const usage = simulateUsage(userMessage, content);
    return NextResponse.json({ content, usage });
  }

  // ── API key present: check budget, then call Anthropic ───────────────
  const remaining = BUDGET_USD - (budgetSpent ?? 0);
  if (remaining <= 0) {
    const content = getLocalResponse(agentSlug as 'eli' | 'nora', userMessage);
    const usage = simulateUsage(userMessage, content);
    return NextResponse.json({ content, usage, budgetExhausted: true });
  }

  try {
    const Anthropic = (await import('@anthropic-ai/sdk')).default;
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

    const response = await client.messages.create({
      model: MODEL,
      max_tokens: 1024,
      system: agent.system,
      messages,
    });

    const content = response.content[0].type === 'text' ? response.content[0].text : '';
    const { input_tokens, output_tokens } = response.usage;
    const cost = calcCost(input_tokens, output_tokens);

    return NextResponse.json({ content, usage: { input_tokens, output_tokens, cost, isLocal: false } });
  } catch (err) {
    // API call failed — fall back to local rather than returning an error
    const content = getLocalResponse(agentSlug as 'eli' | 'nora', userMessage);
    const usage = simulateUsage(userMessage, content);
    return NextResponse.json({ content, usage, fallback: true });
  }
}
