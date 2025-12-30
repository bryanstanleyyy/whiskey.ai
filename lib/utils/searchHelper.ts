import { tavily } from '@tavily/core';

// Initialize Tavily client
const tvly = tavily({ apiKey: process.env.TAVILY_API_KEY || '' });

// Keywords that indicate a current events question
const CURRENT_EVENTS_KEYWORDS = [
  'president', 'prime minister', 'leader', 'government',
  'news', 'latest', 'current', 'today', 'recently',
  'happened', 'happening', 'going on', 'what is',
  'election', 'vote', 'political', 'congress',
  'breaking', 'update', 'now', 'this year',
  'who is', 'what happened', 'current events'
];

/**
 * Detect if a question is likely about current events
 */
export function isCurrentEventsQuestion(message: string): boolean {
  const lowerMessage = message.toLowerCase();

  // Check for current events keywords
  return CURRENT_EVENTS_KEYWORDS.some(keyword =>
    lowerMessage.includes(keyword)
  );
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
