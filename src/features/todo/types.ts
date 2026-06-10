export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  tripId: string;
  createdAt: Date;
}

export interface CreateTodoInput {
  title: string;
  tripId: string;
}

export interface UpdateTodoInput {
  id: string;
  title?: string;
  completed?: boolean;
}
