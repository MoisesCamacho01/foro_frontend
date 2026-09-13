import { Title } from '@angular/platform-browser';
import {
  Component,
  DestroyRef,
  ElementRef,
  inject,
  OnInit,
  signal,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '@src/app/core/services/auth.service';

interface LoginForm {
  alias: FormControl<string>;
}

type LoginUiState = 'idle' | 'loading' | 'success' | 'error';

const FORUM_REDIRECT_MS = 1800;

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly title = inject(Title);

  protected readonly aliasInput = viewChild<ElementRef<HTMLInputElement>>('aliasInput');

  protected readonly form = this.fb.group<LoginForm>({
    alias: this.fb.nonNullable.control('', {
      validators: [Validators.required],
    }),
  });

  protected readonly uiState = signal<LoginUiState>('idle');
  protected readonly showFieldError = signal(false);
  protected readonly welcomeAlias = signal('');
  private redirectTimer: ReturnType<typeof setTimeout> | undefined;

  ngOnInit(): void {
    this.title.setTitle('ForumHub - Iniciar Sesión');
    setTimeout(() => this.aliasInput()?.nativeElement.focus());
    this.destroyRef.onDestroy(() => {
      if (this.redirectTimer !== undefined) {
        clearTimeout(this.redirectTimer);
      }
    });
  }

  protected onSubmit(): void {
    if (this.uiState() === 'loading' || this.uiState() === 'success') {
      return;
    }

    const alias = this.form.controls.alias.value.trim();

    if (!alias) {
      this.showFieldError.set(true);
      this.uiState.set('error');
      this.aliasInput()?.nativeElement.focus();
      return;
    }

    this.showFieldError.set(false);
    this.uiState.set('loading');

    this.authService
      .login({ alias })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          this.welcomeAlias.set(response.alias);
          this.uiState.set('success');
          this.scheduleForumRedirect();
        },
        error: () => {
          this.uiState.set('error');
          this.showFieldError.set(true);
        },
      });
  }

  protected isSubmitDisabled(): boolean {
    return this.uiState() === 'loading' || this.uiState() === 'success';
  }

  private scheduleForumRedirect(): void {
    this.redirectTimer = setTimeout(() => {
      void this.router.navigate(['/foro']);
    }, FORUM_REDIRECT_MS);
  }
}
