export const util = {
  escapeTitle(movieTitle: string): string {
    return movieTitle.replace(/[^a-zA-Z0-9\s]/g, "");
  },
};
