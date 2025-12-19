export interface UserContext {
  userId: string;
  organizationId: string;
  role: 'ADMIN' | 'MEMBER';
}
