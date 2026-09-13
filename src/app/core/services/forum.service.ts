import { Injectable, signal } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  appendReplyInThreads,
  findCommentInThreads,
  mapCommentInThreads,
  userFromAlias,
  type ForumComment,
  type ForumUser,
  type VoteState,
} from '@src/app/core/models/forum.model';

const ROOT_QUESTION_ID = 'q1';

const CANONICAL_QUESTION =
  'Estoy implementando un foro con mutaciones optimistas y réplicas anidadas. ¿Cuál es la mejor forma de estructurar el estado para que el árbol se actualice sin recrear todo el DOM?';

@Injectable({ providedIn: 'root' })
export class ForumService {
  private replySequence = 3;
  private questionSequence = 1;
  private readonly threadsState = signal<ForumComment[]>([createCanonicalThread()]);

  readonly threads = this.threadsState.asReadonly();

  getThreads(): Observable<ForumComment[]> {
    return of(this.threadsState());
  }

  addQuestion(body: string, author: ForumUser): Observable<ForumComment> {
    const text = body.trim();
    this.questionSequence += 1;
    const id = `new_q${this.questionSequence}`;

    const question: ForumComment = {
      id,
      parentId: null,
      author: userFromAlias(author.displayName),
      body: text,
      createdLabel: 'recién publicado',
      relativeLabel: 'recién publicado',
      level: 0,
      badge: 'Nueva pregunta',
      origin: 'user',
      votes: { liked: false, disliked: false, likes: 0, dislikes: 0 },
      children: [],
    };

    this.threadsState.update((threads) => [question, ...threads]);
    return of(question);
  }

  addReply(parentId: string, body: string, author: ForumUser): Observable<ForumComment> {
    const parent = findCommentInThreads(this.threadsState(), parentId);

    if (!parent) {
      return of(this.threadsState()[0]!);
    }

    const text = body.trim();
    this.replySequence += 1;
    const id = `new_r${this.replySequence}`;
    const level = parent.level + 1;
    const isDirect = parent.parentId === null;

    const reply: ForumComment = {
      id,
      parentId,
      author: userFromAlias(author.displayName),
      body: text,
      createdLabel: 'recién publicado',
      relativeLabel: 'recién publicado',
      level,
      badge: isDirect ? 'Respuesta directa' : 'Sub-réplica escalonada',
      origin: 'user',
      votes: { liked: false, disliked: false, likes: 0, dislikes: 0 },
      children: [],
    };

    this.threadsState.update((threads) => appendReplyInThreads(threads, parentId, reply));
    return of(reply);
  }

  toggleLike(id: string): Observable<VoteState> {
    this.threadsState.update((threads) =>
      mapCommentInThreads(threads, id, (comment) => ({
        ...comment,
        votes: applyLike(comment.votes),
      })),
    );

    return of(this.votesOf(id));
  }

  toggleDislike(id: string): Observable<VoteState> {
    this.threadsState.update((threads) =>
      mapCommentInThreads(threads, id, (comment) => ({
        ...comment,
        votes: applyDislike(comment.votes),
      })),
    );

    return of(this.votesOf(id));
  }

  private votesOf(id: string): VoteState {
    const comment = findCommentInThreads(this.threadsState(), id);
    return comment?.votes ?? { liked: false, disliked: false, likes: 0, dislikes: 0 };
  }
}

function applyLike(votes: VoteState): VoteState {
  if (votes.liked) {
    return {
      ...votes,
      liked: false,
      likes: Math.max(0, votes.likes - 1),
    };
  }

  return {
    liked: true,
    disliked: false,
    likes: votes.likes + 1,
    dislikes: votes.disliked ? Math.max(0, votes.dislikes - 1) : votes.dislikes,
  };
}

function applyDislike(votes: VoteState): VoteState {
  if (votes.disliked) {
    return {
      ...votes,
      disliked: false,
      dislikes: Math.max(0, votes.dislikes - 1),
    };
  }

  return {
    liked: false,
    disliked: true,
    likes: votes.liked ? Math.max(0, votes.likes - 1) : votes.likes,
    dislikes: votes.dislikes + 1,
  };
}

function createCanonicalThread(): ForumComment {
  return {
    id: ROOT_QUESTION_ID,
    parentId: null,
    author: {
      displayName: 'Carlos Rodríguez',
      handle: '@carlos_dev',
      initials: 'CR',
      tone: 'author',
    },
    body: CANONICAL_QUESTION,
    createdLabel: 'Publicado a las 14:30',
    relativeLabel: 'Hace 2 horas',
    level: 0,
    badge: '',
    origin: 'seed',
    votes: { liked: false, disliked: false, likes: 15, dislikes: 1 },
    children: [
      {
        id: 'r1',
        parentId: ROOT_QUESTION_ID,
        author: {
          displayName: 'Mariana López',
          initials: 'ML',
          tone: 'level1',
        },
        body: 'Recomiendo separar la capa de mutación optimista para los votos y las réplicas; de este modo la interfaz responde inmediatamente sin esperar latencias del servidor.',
        createdLabel: 'hace 1 hora',
        relativeLabel: 'hace 1 hora',
        level: 1,
        badge: 'Nivel 1',
        origin: 'seed',
        votes: { liked: false, disliked: false, likes: 9, dislikes: 1 },
        children: [
          {
            id: 'r1_1',
            parentId: 'r1',
            author: {
              displayName: 'David Valenzuela',
              initials: 'DV',
              tone: 'level2',
            },
            body: '¡Totalmente de acuerdo! También es clave manejar estructuras de árbol en memoria (parentId) para renderizar el anidamiento sin recrear todo el DOM.',
            createdLabel: 'hace 45 min',
            relativeLabel: 'hace 45 min',
            level: 2,
            badge: 'Nivel 2 (Sub-réplica)',
            origin: 'seed',
            votes: { liked: false, disliked: false, likes: 6, dislikes: 1 },
            children: [
              {
                id: 'r1_1_1',
                parentId: 'r1_1',
                author: {
                  displayName: 'Sofía Gómez',
                  initials: 'SG',
                  tone: 'level3',
                },
                body: 'Exacto, un esquema con nodos enlazados permite crecer la profundidad sin penalizar rendimiento.',
                createdLabel: 'hace 20 min',
                relativeLabel: 'hace 20 min',
                level: 3,
                badge: 'Nivel 3',
                origin: 'seed',
                votes: { liked: false, disliked: false, likes: 3, dislikes: 0 },
                children: [],
              },
            ],
          },
        ],
      },
    ],
  };
}
