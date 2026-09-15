import { inject, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ForumApiAdapter } from '@src/app/core/adapters/forum-api.adapter';
import {
  appendReplyInThreads,
  mapCommentInThreads,
  type ForumComment,
  type ForumUser,
  type VoteState,
} from '@src/app/core/models/forum.model';

@Injectable({ providedIn: 'root' })
export class ForumService {
  private readonly forumApi = inject(ForumApiAdapter);
  private readonly threadsState = signal<ForumComment[]>([]);

  readonly threads = this.threadsState.asReadonly();

  loadThreads(): Observable<ForumComment[]> {
    return this.forumApi.getThreads().pipe(
      tap((threads) => this.threadsState.set(threads)),
    );
  }

  getThreads(): Observable<ForumComment[]> {
    return this.loadThreads();
  }

  addQuestion(body: string, _author: ForumUser): Observable<ForumComment> {
    const text = body.trim();

    return this.forumApi.createQuestion({ body: text }).pipe(
      tap((question) => {
        this.threadsState.update((threads) => [question, ...threads]);
      }),
    );
  }

  addReply(parentId: string, body: string, _author: ForumUser): Observable<ForumComment> {
    const text = body.trim();

    return this.forumApi.createReply({ parentId, body: text }).pipe(
      tap((reply) => {
        this.threadsState.update((threads) => appendReplyInThreads(threads, parentId, reply));
      }),
    );
  }

  toggleLike(id: string): Observable<VoteState> {
    return this.forumApi.like(id).pipe(
      tap((votes) => this.updateVotes(id, votes)),
    );
  }

  toggleDislike(id: string): Observable<VoteState> {
    return this.forumApi.dislike(id).pipe(
      tap((votes) => this.updateVotes(id, votes)),
    );
  }

  private updateVotes(id: string, votes: VoteState): void {
    this.threadsState.update((threads) =>
      mapCommentInThreads(threads, id, (comment) => ({
        ...comment,
        votes,
      })),
    );
  }
}
