import { Title } from '@angular/platform-browser';
import { Component, ElementRef, inject, OnInit, signal, viewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '@src/app/core/services/auth.service';
import { ForumService } from '@src/app/core/services/forum.service';
import { userFromAlias } from '@src/app/core/models/forum.model';
import { QuestionThreadComponent } from '@src/app/features/forum/question-thread/question-thread.component';

interface QuestionForm {
  body: FormControl<string>;
}

@Component({
  selector: 'app-forum',
  imports: [ReactiveFormsModule, RouterLink, QuestionThreadComponent],
  templateUrl: './forum.component.html',
})
export class ForumComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly forumService = inject(ForumService);
  private readonly title = inject(Title);

  protected readonly questionInput =
    viewChild<ElementRef<HTMLTextAreaElement>>('questionInput');

  protected readonly threads = this.forumService.threads;
  protected readonly currentAlias = signal(this.authService.getStoredAlias() ?? 'Usuario');

  protected readonly questionForm = this.fb.group<QuestionForm>({
    body: this.fb.nonNullable.control('', {
      validators: [Validators.required],
    }),
  });

  ngOnInit(): void {
    this.title.setTitle('ForumHub - Preguntas de la Comunidad');
    this.forumService.loadThreads().subscribe();
  }

  protected publishQuestion(): void {
    const body = this.questionForm.controls.body.value.trim();

    if (!body) {
      this.questionInput()?.nativeElement.focus();
      return;
    }

    this.forumService.addQuestion(body, userFromAlias(this.currentAlias())).subscribe({
      next: () => {
        this.questionForm.reset({ body: '' });
      },
    });
  }
}
