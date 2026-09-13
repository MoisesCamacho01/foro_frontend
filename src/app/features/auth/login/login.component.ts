import { Component, ElementRef, inject, OnInit, signal, viewChild } from '@angular/core';
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

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);

  protected readonly aliasInput = viewChild<ElementRef<HTMLInputElement>>('aliasInput');

  protected readonly form = this.fb.group<LoginForm>({
    alias: this.fb.nonNullable.control('', {
      validators: [Validators.required],
    }),
  });

  protected readonly uiState = signal<LoginUiState>('idle');
  protected readonly showFieldError = signal(false);
  protected readonly welcomeAlias = signal('');

  ngOnInit(): void {
    setTimeout(() => this.aliasInput()?.nativeElement.focus());
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

    this.authService.login({ alias }).subscribe({
      next: (response) => {
        this.welcomeAlias.set(response.alias);
        this.uiState.set('success');
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
}
