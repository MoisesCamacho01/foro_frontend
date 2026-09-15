export interface AppConfig {
  maxReplyLevels: number | null;
}

export function canReplyAtLevel(level: number, maxReplyLevels: number | null): boolean {
  return maxReplyLevels === null || level < maxReplyLevels;
}
