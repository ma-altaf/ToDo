namespace ToDo.Dtos
{
    public record class AddTodoItemDto(
        string Title,
        string? Description,
        DateTime Deadline
    );
}
