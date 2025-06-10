import { Dispatch, startTransition } from "react";
import { EStatus, StatusList, TToDoItem } from "../services/types";
import StatusInner from "./StatusInner";
import { useTodosContext } from "./TodoProvider";
import { updateItemById } from "../services/main";

export default function UpdateStatus({
  item,
  setIsOpen,
}: {
  item: TToDoItem;
  setIsOpen: Dispatch<React.SetStateAction<boolean>>;
}) {
  const { dispatch, setDbTodos } = useTodosContext();

  function submit(item: TToDoItem, newStatus: EStatus) {
    const { id, title, description, deadline } = item;
    startTransition(() => {
      dispatch({
        type: "status",
        id,
        status: newStatus,
        data: item,
      });
    });

    startTransition(async () => {
      try {
        const res = await updateItemById(item.id, {
          title,
          description,
          deadline: deadline,
          status: newStatus,
        });

        setDbTodos((prev) =>
          prev.map((item) => {
            if (item.id == res.id) {
              return res;
            }
            return item;
          })
        );
      } catch {
        console.log("failed to update status.");
      }
    });

    setIsOpen(false);
  }

  return (
    <div className="z-10 absolute top-1/2 left-1/2 -translate-1/2 bg-background border-2 border-white/10 rounded-full size-fit">
      <ul>
        {StatusList.map((status) => (
          <li
            onClick={() => submit(item, status)}
            key={status}
            className="p-2 rounded-full hover:bg-foreground/10"
          >
            <StatusInner status={status} />
          </li>
        ))}
      </ul>
    </div>
  );
}
