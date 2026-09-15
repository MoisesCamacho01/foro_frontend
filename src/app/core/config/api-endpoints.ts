export interface AuthEndpoints {
  login: string;
  logout: string;
}

export interface ForumEndpoints {
  questions: string;
  comments: string;
  vote: (commentId: string) => string;
}

export interface ApiEndpoints {
  auth: AuthEndpoints;
  forum: ForumEndpoints;
}

export const API_ENDPOINTS: ApiEndpoints = {
  auth: {
    login: '/auth/login',
    logout: '/auth/logout',
  },
  forum: {
    questions: '/questions',
    comments: '/comments',
    vote: (commentId: string) => `/comments/${commentId}/vote`,
  },
};
