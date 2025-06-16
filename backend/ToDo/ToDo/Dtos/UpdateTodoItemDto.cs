using static ToDo.Models.TodoItem;

namespace ToDo.Dtos
{
    public record class UpdateTodoItemDto(
        string Title,
        string? Description,
        DateTime Deadline,
        StatusEnum Status
    );
}
