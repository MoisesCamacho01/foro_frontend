import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG, buildApiUrl } from '@src/app/core/config/api.config';
import type { ApiResponse } from '@src/app/core/models/api-response.model';
import type {
  CreateQuestionRequest,
  CreateReplyRequest,
  VoteRequest,
} from '@src/app/core/models/forum-api.model';
import type { ForumComment, VoteState } from '@src/app/core/models/forum.model';
import { unwrapApiResponse } from '@src/app/core/utils/unwrap-api-response.operator';

@Injectable({ providedIn: 'root' })
export class ForumApiAdapter {
  private readonly http = inject(HttpClient);
  private readonly config = inject(API_CONFIG);

  getThreads(): Observable<ForumComment[]> {
    const url = buildApiUrl(this.config, this.config.endpoints.forum.questions);

    return this.http.get<ApiResponse<ForumComment[]>>(url).pipe(unwrapApiResponse());
  }

  createQuestion(request: CreateQuestionRequest): Observable<ForumComment> {
    const url = buildApiUrl(this.config, this.config.endpoints.forum.questions);

    return this.http
      .post<ApiResponse<ForumComment>>(url, request)
      .pipe(unwrapApiResponse());
  }

  createReply(request: CreateReplyRequest): Observable<ForumComment> {
    const url = buildApiUrl(this.config, this.config.endpoints.forum.comments);

    return this.http
      .post<ApiResponse<ForumComment>>(url, request)
      .pipe(unwrapApiResponse());
  }

  vote(commentId: string, request: VoteRequest): Observable<VoteState> {
    const url = buildApiUrl(this.config, this.config.endpoints.forum.vote(commentId));

    return this.http
      .post<ApiResponse<VoteState>>(url, request)
      .pipe(unwrapApiResponse());
  }

  like(commentId: string): Observable<VoteState> {
    return this.vote(commentId, { type: 'like' });
  }

  dislike(commentId: string): Observable<VoteState> {
    return this.vote(commentId, { type: 'dislike' });
  }
}
