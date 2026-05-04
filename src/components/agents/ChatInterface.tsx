'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Send, Zap } from 'lucide-react';
import { type AgentConfig, BUDGET_USD, BUDGET_KEY, formatUSD } from '@/lib/agents';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  usage?: { input_tokens: number; output_tokens: number; cost: number; isLocal?: boolean };
}

// ── Minimal markdown renderer ──────────────────────────────────────────────
function renderMarkdown(text: string) {
  const blocks = text.split(/\n{2,}/);
  return blocks.map((block, bi) => {
    const trimmed = block.trim();
    if (!trimmed) return null;

    // Heading
    if (trimmed.startsWith('### ')) return <h4 key={bi} className="font-semibold text-sm mt-3 mb-1">{trimmed.slice(4)}</h4>;
    if (trimmed.startsWith('## '))  return <h3 key={bi} className="font-display text-base mt-4 mb-1">{trimmed.slice(3)}</h3>;
    if (trimmed.startsWith('# '))   return <h2 key={bi} className="font-display text-lg mt-4 mb-1">{trimmed.slice(2)}</h2>;

    // Unordered list
    if (/^[-•*]\s/.test(trimmed)) {
      const items = trimmed.split('\n').map(l => l.replace(/^[-•*]\s/, '').trim()).filter(Boolean);
      return (
        <ul key={bi} className="list-none space-y-1 my-2">
          {items.map((item, ii) => (
            <li key={ii} className="flex gap-2">
              <span style={{ color: 'var(--accent)', marginTop: '0.25em', flexShrink: 0 }}>·</span>
              <span>{inlineFormat(item)}</span>
            </li>
          ))}
        </ul>
      );
    }

    // Ordered list
    if (/^\d+\.\s/.test(trimmed)) {
      const items = trimmed.split('\n').map(l => l.replace(/^\d+\.\s/, '').trim()).filter(Boolean);
      return (
        <ol key={bi} className="space-y-1 my-2">
          {items.map((item, ii) => (
            <li key={ii} className="flex gap-2">
              <span style={{ color: 'var(--accent)', flexShrink: 0, minWidth: '1.2em' }}>{ii + 1}.</span>
              <span>{inlineFormat(item)}</span>
            </li>
          ))}
        </ol>
      );
    }

    // Horizontal rule
    if (/^---+$/.test(trimmed)) return <hr key={bi} className="my-3 opacity-20" />;

    // Regular paragraph
    return <p key={bi} className="leading-relaxed">{inlineFormat(trimmed)}</p>;
  });
}

function inlineFormat(text: string) {
  // Split on bold (**), italic (*), code (`) markers
  const parts: React.ReactNode[] = [];
  const re = /(\*\*([^*]+)\*\*|\*([^*]+)\*|`([^`]+)`)/g;
  let last = 0, match: RegExpExecArray | null;
  while ((match = re.exec(text)) !== null) {
    if (match.index > last) parts.push(text.slice(last, match.index));
    if (match[2]) parts.push(<strong key={match.index}>{match[2]}</strong>);
    else if (match[3]) parts.push(<em key={match.index}>{match[3]}</em>);
    else if (match[4]) parts.push(
      <code key={match.index} className="rounded px-1 py-0.5 text-[0.8em] font-mono"
        style={{ background: 'oklch(1 0 0 / 0.08)', color: 'var(--accent)' }}>
        {match[4]}
      </code>
    );
    last = match.index + match[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

// ── Budget storage ─────────────────────────────────────────────────────────
function loadBudget(): number {
  try { return parseFloat(localStorage.getItem(BUDGET_KEY) ?? '0') || 0; } catch { return 0; }
}
function saveBudget(v: number) {
  try { localStorage.setItem(BUDGET_KEY, String(v)); } catch {}
}

// ── Main component ─────────────────────────────────────────────────────────
export function ChatInterface({ agent }: { agent: AgentConfig }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [budgetSpent, setBudgetSpent] = useState(0);
  const [sessionTokens, setSessionTokens] = useState({ in: 0, out: 0 });
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => { setBudgetSpent(loadBudget()); }, []);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, loading]);

  const send = useCallback(async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;
    setInput('');

    const userMsg: Message = { role: 'user', content: trimmed };
    const history = [...messages, userMsg];
    setMessages(history);
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          agentSlug: agent.slug,
          messages: history.map(m => ({ role: m.role, content: m.content })),
          budgetSpent,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Request failed');

      const assistantMsg: Message = {
        role: 'assistant',
        content: data.content,
        usage: data.usage,
      };

      setMessages(prev => [...prev, assistantMsg]);

      const newSpent = budgetSpent + data.usage.cost;
      setBudgetSpent(newSpent);
      saveBudget(newSpent);
      setSessionTokens(prev => ({
        in: prev.in + data.usage.input_tokens,
        out: prev.out + data.usage.output_tokens,
      }));
    } catch (err) {
      const errMsg: Message = {
        role: 'assistant',
        content: err instanceof Error ? err.message : 'Something went wrong. Try again.',
      };
      setMessages(prev => [...prev, errMsg]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  }, [messages, loading, budgetSpent, agent.slug]);

  const handleKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(input); }
  };

  const remaining = BUDGET_USD - budgetSpent;
  const budgetPct = Math.min(100, (budgetSpent / BUDGET_USD) * 100);
  const budgetColor = budgetPct > 80 ? 'oklch(0.65 0.18 25)' : budgetPct > 50 ? 'oklch(0.78 0.13 70)' : 'oklch(0.72 0.15 150)';

  return (
    <div className="flex flex-col h-screen" style={{ background: 'var(--background)' }}>

      {/* ── Header ── */}
      <header
        className="flex-shrink-0 flex items-center gap-4 px-4 sm:px-6 py-3 border-b"
        style={{ borderColor: 'var(--border)', background: 'oklch(0.13 0.005 260 / 0.85)', backdropFilter: 'blur(20px)' }}
      >
        <Link href="/agents" className="h-8 w-8 rounded-full border flex items-center justify-center transition-colors hover:text-white flex-shrink-0"
          style={{ borderColor: 'var(--border)', color: 'var(--muted-foreground)' }}>
          <ArrowLeft className="h-3.5 w-3.5" />
        </Link>

        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="relative flex-shrink-0">
            <Image
              src={`/agents/${agent.slug}.jpg`}
              alt={agent.name}
              width={36} height={36}
              className="rounded-full object-cover object-top"
            />
            <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-[var(--background)]"
              style={{ background: 'oklch(0.72 0.15 150)' }} />
          </div>
          <div className="min-w-0">
            <div className="font-medium text-sm leading-none truncate">{agent.name}</div>
            <div className="text-[10px] mt-0.5 truncate" style={{ color: 'var(--muted-foreground)' }}>{agent.role}</div>
          </div>
        </div>

        {/* Budget meter */}
        <div className="flex-shrink-0 text-right">
          <div className="flex items-center gap-1.5 justify-end mb-1">
            <Zap className="h-3 w-3" style={{ color: budgetColor }} />
            <span className="text-[10px] font-medium tabular-nums" style={{ color: budgetColor }}>
              {formatUSD(remaining)} left
            </span>
          </div>
          <div className="w-24 h-1 rounded-full overflow-hidden" style={{ background: 'var(--surface-elevated)' }}>
            <div className="h-full rounded-full transition-all" style={{ width: `${budgetPct}%`, background: budgetColor }} />
          </div>
        </div>
      </header>

      {/* ── Messages ── */}
      <div className="flex-1 overflow-y-auto">
        {messages.length === 0 ? (
          /* Welcome state */
          <div className="flex flex-col items-center justify-center h-full px-6 pb-8 gap-6">
            <div className="text-center">
              <Image
                src={`/agents/${agent.slug}.jpg`}
                alt={agent.name}
                width={88} height={88}
                className="rounded-2xl object-cover object-top mx-auto mb-4 shadow-card"
                style={{ border: '1px solid var(--border)' }}
              />
              <div className="font-display text-2xl mb-1">{agent.name}</div>
              <div className="text-xs mb-3" style={{ color: agent.accentText }}>{agent.role}</div>
              <p className="text-sm max-w-xs mx-auto text-center leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                {agent.description}
              </p>
            </div>

            {/* Quick task chips */}
            <div className="flex flex-wrap gap-2 justify-center max-w-md">
              {agent.tasks.map(t => (
                <button
                  key={t.label}
                  onClick={() => send(t.prompt)}
                  className="rounded-full border px-3 py-1.5 text-xs font-medium transition-all hover:text-white hover:-translate-y-0.5"
                  style={{ borderColor: 'var(--border)', background: 'var(--surface)', color: 'var(--muted-foreground)' }}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6 flex flex-col gap-5">
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                {/* Avatar */}
                {msg.role === 'assistant' && (
                  <Image
                    src={`/agents/${agent.slug}.jpg`}
                    alt={agent.name}
                    width={28} height={28}
                    className="rounded-full object-cover object-top flex-shrink-0 mt-1"
                  />
                )}

                <div className={`flex flex-col gap-1 max-w-[85%] ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                  <div
                    className="rounded-2xl px-4 py-3 text-sm leading-relaxed"
                    style={msg.role === 'user'
                      ? { background: 'var(--accent)', color: 'oklch(0.13 0.005 260)', borderBottomRightRadius: '6px' }
                      : { background: 'var(--surface)', borderColor: 'var(--border)', border: '1px solid var(--border)', borderBottomLeftRadius: '6px' }
                    }
                  >
                    {msg.role === 'assistant'
                      ? <div className="space-y-2">{renderMarkdown(msg.content)}</div>
                      : <span>{msg.content}</span>
                    }
                  </div>

                  {/* Token usage under assistant messages */}
                  {msg.role === 'assistant' && msg.usage && (
                    <div className="flex items-center gap-2 px-1 text-[10px]" style={{ color: 'var(--muted-foreground)' }}>
                      {msg.usage.isLocal ? (
                        <span className="px-1.5 py-0.5 rounded-full text-[9px] font-medium"
                          style={{ background: 'var(--surface-elevated)', color: 'oklch(0.72 0.15 150)', border: '1px solid var(--border)' }}>
                          Local · no API cost
                        </span>
                      ) : (
                        <>
                          <span>{msg.usage.input_tokens}↑ {msg.usage.output_tokens}↓ tokens</span>
                          <span>·</span>
                          <span>{formatUSD(msg.usage.cost)}</span>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {loading && (
              <div className="flex gap-3">
                <Image src={`/agents/${agent.slug}.jpg`} alt={agent.name} width={28} height={28}
                  className="rounded-full object-cover object-top flex-shrink-0 mt-1" />
                <div className="rounded-2xl px-4 py-3 flex items-center gap-1"
                  style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderBottomLeftRadius: '6px' }}>
                  {[0, 150, 300].map(d => (
                    <span key={d} className="h-1.5 w-1.5 rounded-full animate-bounce"
                      style={{ background: 'var(--muted-foreground)', animationDelay: `${d}ms` }} />
                  ))}
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>
        )}
      </div>

      {/* ── Quick chips (after conversation starts) ── */}
      {messages.length > 0 && (
        <div className="flex-shrink-0 overflow-x-auto px-4 sm:px-6 py-2 flex gap-2"
          style={{ borderTop: '1px solid var(--border)' }}>
          {agent.tasks.map(t => (
            <button key={t.label} onClick={() => send(t.prompt)} disabled={loading}
              className="flex-shrink-0 rounded-full border px-3 py-1 text-[11px] font-medium transition-colors hover:text-white disabled:opacity-40"
              style={{ borderColor: 'var(--border)', background: 'var(--surface)', color: 'var(--muted-foreground)' }}>
              {t.label}
            </button>
          ))}
        </div>
      )}

      {/* ── Input ── */}
      <div className="flex-shrink-0 px-4 sm:px-6 py-4" style={{ borderTop: messages.length > 0 ? 'none' : '1px solid var(--border)' }}>
        <div className="max-w-2xl mx-auto flex gap-2 items-end">
          <textarea
            ref={inputRef}
            rows={1}
            value={input}
            onChange={e => {
              setInput(e.target.value);
              e.target.style.height = 'auto';
              e.target.style.height = `${Math.min(e.target.scrollHeight, 160)}px`;
            }}
            onKeyDown={handleKey}
            placeholder={`Message ${agent.name}…`}
            disabled={loading || remaining <= 0}
            className="flex-1 resize-none rounded-2xl border px-4 py-3 text-sm outline-none transition-colors leading-relaxed"
            style={{
              background: 'var(--surface)',
              borderColor: 'var(--border)',
              color: 'var(--foreground)',
              minHeight: '48px',
              maxHeight: '160px',
              fontFamily: 'var(--font-sans)',
            }}
          />
          <button
            onClick={() => send(input)}
            disabled={!input.trim() || loading || remaining <= 0}
            className="flex-shrink-0 h-12 w-12 rounded-2xl flex items-center justify-center transition-opacity disabled:opacity-30 hover:opacity-90"
            style={{ background: 'var(--accent)', color: 'oklch(0.13 0.005 260)' }}
          >
            <Send className="h-4 w-4" />
          </button>
        </div>

        {/* Session stats */}
        {(sessionTokens.in > 0) && (
          <div className="max-w-2xl mx-auto mt-2 flex justify-between px-1 text-[10px]"
            style={{ color: 'var(--muted-foreground)' }}>
            <span>
              {budgetSpent > 0
                ? `Session: ${sessionTokens.in + sessionTokens.out} tokens · ${formatUSD(budgetSpent)} total`
                : `Session: ${sessionTokens.in + sessionTokens.out} est. tokens · Local (free)`}
            </span>
            <span>Shift+Enter for new line</span>
          </div>
        )}

        {remaining <= 0 && (
          <p className="max-w-2xl mx-auto mt-2 text-center text-xs" style={{ color: 'oklch(0.65 0.18 25)' }}>
            Budget exhausted. Reset via browser localStorage to continue.
          </p>
        )}
      </div>
    </div>
  );
}
