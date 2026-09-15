import { Component, computed, ElementRef, inject, input, signal, viewChild } from '@angular/core';
import { userFromAlias, type ForumComment } from '@src/app/core/models/forum.model';
import { AuthService } from '@src/app/core/services/auth.service';
import { ConfigService } from '@src/app/core/services/config.service';
import { ForumService } from '@src/app/core/services/forum.service';

@Component({
  selector: 'app-comment-node',
  imports: [CommentNodeComponent],
  templateUrl: './comment-node.component.html',
})
export class CommentNodeComponent {
  private readonly forumService = inject(ForumService);
  private readonly authService = inject(AuthService);
  private readonly configService = inject(ConfigService);

  readonly comment = input.required<ForumComment>();

  protected readonly replyOpen = signal(false);
  protected readonly replyDraft = signal('');
  protected readonly replyInput = viewChild<ElementRef<HTMLInputElement>>('replyField');
  protected readonly canReply = computed(() =>
    this.configService.canReplyAtLevel(this.comment().level),
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
    this.forumService.addReply(this.comment().id, text, userFromAlias(alias)).subscribe({
      next: () => {
        this.replyDraft.set('');
        this.replyOpen.set(false);
      },
    });
  }

  protected toggleLike(): void {
    this.forumService.toggleLike(this.comment().id).subscribe();
  }

  protected toggleDislike(): void {
    this.forumService.toggleDislike(this.comment().id).subscribe();
  }

  protected onReplyInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.replyDraft.set(target.value);
  }

  protected cardClasses(): string {
    const comment = this.comment();

    if (comment.origin === 'user') {
      return 'bg-white border border-blue-200/70 rounded-xl p-4 shadow-sm transition-all hover:shadow';
    }

    if (comment.level === 1) {
      return 'bg-gray-50/70 border border-gray-200/80 rounded-xl p-4 transition-all hover:bg-white hover:shadow-sm';
    }

    if (comment.level === 2) {
      return 'bg-gray-50/90 border border-gray-200 rounded-xl p-3.5 transition-all hover:bg-white hover:shadow-sm';
    }

    return 'bg-white border border-blue-100 rounded-xl p-3 shadow-xs';
  }

  protected avatarClasses(): string {
    const { author, level, origin } = this.comment();

    if (origin === 'user' || author.tone === 'current') {
      return 'w-7 h-7 rounded-full bg-blue-100 text-primary flex items-center justify-center font-bold text-xs border border-blue-300';
    }

    if (level === 1 || author.tone === 'level1') {
      return 'w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs border border-emerald-300';
    }

    if (level === 2 || author.tone === 'level2') {
      return 'w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-[11px] border border-indigo-200';
    }

    return 'w-6 h-6 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-[10px]';
  }

  protected badgeClasses(): string {
    const comment = this.comment();

    if (comment.origin === 'user' || comment.level === 2) {
      return 'text-[10px] px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-semibold border border-blue-200';
    }

    if (comment.level === 1) {
      return 'text-[10px] px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200';
    }

    return 'text-[9px] px-1.5 py-0.5 rounded bg-purple-50 text-purple-700 font-semibold border border-purple-200';
  }

  protected likeIconClass(liked: boolean): string {
    return liked ? 'ph-fill ph-thumbs-up' : 'ph ph-thumbs-up';
  }

  protected dislikeIconClass(disliked: boolean): string {
    return disliked ? 'ph-fill ph-thumbs-down' : 'ph ph-thumbs-down';
  }
}
