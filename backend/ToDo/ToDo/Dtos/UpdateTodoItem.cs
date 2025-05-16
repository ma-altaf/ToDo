namespace ToDo.Dtos
{
    public record class UpdateTodoItem(
        string Title,
        string? Description
    );
}
