import { notFound } from "next/navigation";
import { AGENTS } from "@/lib/agents";
import { ChatInterface } from "@/components/agents/ChatInterface";
import type { Metadata } from "next";

interface Props { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const agent = AGENTS[slug];
  if (!agent) return { title: "Not Found" };
  return {
    title: `${agent.name} — JobChain Agents`,
    description: agent.description,
  };
}

export function generateStaticParams() {
  return Object.keys(AGENTS).map(slug => ({ slug }));
}

export default async function AgentChatPage({ params }: Props) {
  const { slug } = await params;
  const agent = AGENTS[slug];
  if (!agent) notFound();
  return <ChatInterface agent={agent} />;
}
