export type AvatarTone = 'author' | 'level1' | 'level2' | 'level3' | 'current';

export type CommentOrigin = 'seed' | 'user';

export interface ForumUser {
  displayName: string;
  handle?: string;
  initials: string;
  tone: AvatarTone;
}

export interface VoteState {
  liked: boolean;
  disliked: boolean;
  likes: number;
  dislikes: number;
}

export interface ForumComment {
  id: string;
  parentId: string | null;
  author: ForumUser;
  body: string;
  createdLabel: string;
  relativeLabel: string;
  level: number;
  badge: string;
  origin: CommentOrigin;
  votes: VoteState;
  children: ForumComment[];
}

export function initialsFromAlias(alias: string): string {
  const trimmed = alias.trim();
  const parts = trimmed.split(/\s+/).filter(Boolean);

  if (parts.length >= 2) {
    const first = parts[0]?.charAt(0) ?? '';
    const second = parts[1]?.charAt(0) ?? '';
    return `${first}${second}`.toUpperCase();
  }

  return trimmed.slice(0, 2).toUpperCase();
}

export function userFromAlias(alias: string): ForumUser {
  const displayName = alias.trim();

  return {
    displayName,
    handle: displayName.startsWith('@') ? displayName : `@${displayName}`,
    initials: initialsFromAlias(displayName),
    tone: 'current',
  };
}

export function countReplies(node: ForumComment): number {
  return node.children.reduce((total, child) => total + 1 + countReplies(child), 0);
}

export function mapComment(
  node: ForumComment,
  id: string,
  updater: (comment: ForumComment) => ForumComment,
): ForumComment {
  if (node.id === id) {
    return updater(node);
  }

  return {
    ...node,
    children: node.children.map((child) => mapComment(child, id, updater)),
  };
}

export function appendReply(
  node: ForumComment,
  parentId: string,
  reply: ForumComment,
): ForumComment {
  if (node.id === parentId) {
    return {
      ...node,
      children: [...node.children, reply],
    };
  }

  return {
    ...node,
    children: node.children.map((child) => appendReply(child, parentId, reply)),
  };
}

export function findComment(node: ForumComment, id: string): ForumComment | null {
  if (node.id === id) {
    return node;
  }

  for (const child of node.children) {
    const match = findComment(child, id);
    if (match) {
      return match;
    }
  }

  return null;
}

export function findCommentInThreads(
  threads: ForumComment[],
  id: string,
): ForumComment | null {
  for (const thread of threads) {
    const match = findComment(thread, id);
    if (match) {
      return match;
    }
  }

  return null;
}

export function mapCommentInThreads(
  threads: ForumComment[],
  id: string,
  updater: (comment: ForumComment) => ForumComment,
): ForumComment[] {
  return threads.map((thread) => mapComment(thread, id, updater));
}

export function appendReplyInThreads(
  threads: ForumComment[],
  parentId: string,
  reply: ForumComment,
): ForumComment[] {
  return threads.map((thread) => appendReply(thread, parentId, reply));
}
