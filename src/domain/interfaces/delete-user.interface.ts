export interface DeleteUser {
  execute(id: string): Promise<{ message: string }>;
}