export interface CreateQuestionRequest {
  body: string;
}

export interface CreateReplyRequest {
  parentId: string;
  body: string;
}

export type VoteType = 'like' | 'dislike';

export interface VoteRequest {
  type: VoteType;
}
