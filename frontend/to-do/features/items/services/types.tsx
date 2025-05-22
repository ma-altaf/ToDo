enum StatusEnum {
  todo,
  completed,
  blocked,
}

export type TToDoItem = {
  id: number;
  title: string;
  description?: string;
  status: StatusEnum;
};
