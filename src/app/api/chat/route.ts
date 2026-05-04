import Anthropic from '@anthropic-ai/sdk';
import { NextResponse } from 'next/server';
import { AGENTS, MODEL, calcCost, BUDGET_USD } from '@/lib/agents';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req: Request) {
  const { agentSlug, messages, budgetSpent } = await req.json() as {
    agentSlug: string;
    messages: { role: 'user' | 'assistant'; content: string }[];
    budgetSpent: number;
  };

  const agent = AGENTS[agentSlug];
  if (!agent) return NextResponse.json({ error: 'Unknown agent' }, { status: 400 });

  const remaining = BUDGET_USD - (budgetSpent ?? 0);
  if (remaining <= 0) {
    return NextResponse.json({ error: 'Budget exhausted. Add more funds to continue.' }, { status: 402 });
  }

  try {
    const response = await client.messages.create({
      model: MODEL,
      max_tokens: 1024,
      system: agent.system,
      messages,
    });

    const content = response.content[0].type === 'text' ? response.content[0].text : '';
    const { input_tokens, output_tokens } = response.usage;
    const cost = calcCost(input_tokens, output_tokens);

    return NextResponse.json({ content, usage: { input_tokens, output_tokens, cost } });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'API error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
