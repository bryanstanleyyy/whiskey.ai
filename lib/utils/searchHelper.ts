import { tavily } from '@tavily/core';
import Groq from 'groq-sdk';

// Initialize clients
const tvly = tavily({ apiKey: process.env.TAVILY_API_KEY || '' });
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY || '' });

/**
 * Use AI to intelligently detect if a question requires current/real-time information
 * This is more accurate than keyword matching and adapts to any question type
 */
export async function isCurrentEventsQuestion(message: string): Promise<boolean> {
  try {
    // Use a fast, cheap model call to detect if search is needed
    const response = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        {
          role: 'system',
          content: `You are a classification system. Determine if a question requires real-time web search to answer accurately.

Answer YES if the question is about:
- Current events, news, or recent happenings
- Current leaders, officials, or public figures (presidents, CEOs, etc.)
- Recent sports results, awards, or competitions
- Current prices, stocks, weather, or time-sensitive data
- Recent technology releases or announcements
- Any information that changes frequently or is time-sensitive

Answer NO if the question is about:
- General knowledge that doesn't change (history, science facts, definitions)
- Personal opinions or creative requests
- Programming or technical help
- General conversation or greetings
- Hypothetical or philosophical questions

Respond with ONLY "YES" or "NO" - nothing else.`,
        },
        {
          role: 'user',
          content: message,
        },
      ],
      temperature: 0.1, // Low temperature for consistent classification
      max_tokens: 5, // We only need "YES" or "NO"
    });

    const answer = response.choices[0]?.message?.content?.trim().toUpperCase();
    const needsSearch = answer === 'YES';

    console.log(`[AI Detection] "${message}" → ${needsSearch ? 'SEARCH' : 'SKIP'}`);

    return needsSearch;
  } catch (error) {
    console.error('[AI Detection] Error:', error);
    // Fallback to simple keyword check if AI fails
    const fallbackKeywords = ['president', 'news', 'latest', 'current', 'today'];
    const needsSearch = fallbackKeywords.some(kw => message.toLowerCase().includes(kw));
    console.log(`[AI Detection] Fallback → ${needsSearch ? 'SEARCH' : 'SKIP'}`);
    return needsSearch;
  }
}

/**
 * Search for current information using Tavily
 */
export async function searchCurrentEvents(query: string): Promise<string | null> {
  try {
    // Only search if we have an API key
    if (!process.env.TAVILY_API_KEY) {
      console.log('[Search] No Tavily API key configured');
      return null;
    }

    console.log('[Search] Searching for:', query);

    const response = await tvly.search(query, {
      maxResults: 3,
      searchDepth: 'basic',
      includeAnswer: true,
    });

    // Return the AI-generated answer if available
    if (response.answer) {
      console.log('[Search] Found answer:', response.answer);
      return response.answer;
    }

    // Otherwise, combine top results
    if (response.results && response.results.length > 0) {
      const summary = response.results
        .slice(0, 2)
        .map((r: { content: string }) => r.content)
        .join('\n\n');

      console.log('[Search] Compiled summary from results');
      return summary;
    }

    return null;
  } catch (error) {
    console.error('[Search] Error:', error);
    return null;
  }
}

/**
 * Build context with search results
 */
export function buildSearchContext(searchResults: string): string {
  return `[CURRENT INFORMATION FROM WEB SEARCH]
${searchResults}

Use the information above to answer the question accurately. If the search results contradict your training data, trust the search results as they are more current.
`;
}
