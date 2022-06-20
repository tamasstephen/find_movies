export const util = {
  escapeTitle(movieTitle: string): string {
    return movieTitle.replace(/[^a-zA-Z0-9\s]/g, "");
  },

  generateId(): number {
    return Math.floor(Math.random() * Math.floor(Math.random() * Date.now()));
  },

  shortenText(text: string, textLength: number): string {
    return text.length > textLength
      ? text.substring(0, textLength).trim() + "..."
      : text;
  },
};
