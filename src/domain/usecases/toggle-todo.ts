export interface ToggleTodo {
  invoke(id: number): Promise<boolean>;
}
