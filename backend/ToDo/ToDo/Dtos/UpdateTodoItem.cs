using static ToDo.Models.TodoItem;

namespace ToDo.Dtos
{
    public record class UpdateTodoItem(
        string Title,
        string? Description,
        DateTime Deadline,
        StatusEnum Status
    );
}
