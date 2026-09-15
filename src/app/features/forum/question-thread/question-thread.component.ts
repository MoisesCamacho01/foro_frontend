import { Component, computed, ElementRef, inject, input, signal, viewChild } from '@angular/core';
import { AuthService } from '@src/app/core/services/auth.service';
import { ConfigService } from '@src/app/core/services/config.service';
import { ForumService } from '@src/app/core/services/forum.service';
import { countReplies, userFromAlias, type ForumComment } from '@src/app/core/models/forum.model';
import { CommentNodeComponent } from '@src/app/features/forum/comment-node/comment-node.component';

@Component({
  selector: 'app-question-thread',
  imports: [CommentNodeComponent],
  templateUrl: './question-thread.component.html',
})
export class QuestionThreadComponent {
  private readonly forumService = inject(ForumService);
  private readonly authService = inject(AuthService);
  private readonly configService = inject(ConfigService);

  readonly thread = input.required<ForumComment>();

  protected readonly replyInput = viewChild<ElementRef<HTMLInputElement>>('replyField');
  protected readonly replyOpen = signal(false);
  protected readonly replyDraft = signal('');
  protected readonly replyCount = computed(() => countReplies(this.thread()));
  protected readonly canReply = computed(() =>
    this.configService.canReplyAtLevel(this.thread().level),
  );

  protected toggleReply(): void {
    const willOpen = !this.replyOpen();
    this.replyOpen.set(willOpen);

    if (willOpen) {
      setTimeout(() => this.replyInput()?.nativeElement.focus());
    }
  }

  protected submitReply(): void {
    if (!this.canReply()) {
      return;
    }

    const inputEl = this.replyInput()?.nativeElement;
    const text = this.replyDraft().trim();

    if (!text) {
      inputEl?.focus();
      return;
    }

    const alias = this.authService.getStoredAlias() ?? 'Usuario';
    this.forumService.addReply(this.thread().id, text, userFromAlias(alias)).subscribe({
      next: () => {
        this.replyDraft.set('');
        this.replyOpen.set(false);
      },
    });
  }

  protected onReplyInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.replyDraft.set(target.value);
  }

  protected toggleLike(): void {
    this.forumService.toggleLike(this.thread().id).subscribe();
  }

  protected toggleDislike(): void {
    this.forumService.toggleDislike(this.thread().id).subscribe();
  }

  protected likeIconClass(liked: boolean): string {
    return liked ? 'ph-fill ph-thumbs-up' : 'ph ph-thumbs-up';
  }

  protected dislikeIconClass(disliked: boolean): string {
    return disliked ? 'ph-fill ph-thumbs-down' : 'ph ph-thumbs-down';
  }

  protected questionTextId(): string {
    return this.thread().id === 'q1' ? 'main-question-text' : `main-question-text-${this.thread().id}`;
  }

  protected isUserQuestion(): boolean {
    return this.thread().origin === 'user';
  }
}
