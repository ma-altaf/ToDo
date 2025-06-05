export enum EStatus {
  todo,
  completed,
  blocked,
  syncing,
}

export type TToDoItem = {
  id: string;
  title: string;
  description?: string;
  deadline: string;
  status: EStatus;
};

export type TToDoReducer =
  | {
      type: "add";
      data: Pick<TToDoItem, "deadline" | "title" | "description">;
    }
  | {
      type: "update";
      id: string;
      data: Pick<TToDoItem, "deadline" | "title" | "description">;
    }
  | {
      type: "delete";
      id: string;
    };
