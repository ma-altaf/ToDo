using System.ComponentModel.DataAnnotations.Schema;

namespace ToDo.Models
{
    public class TodoItem
    {
        public enum StatusEnum
        {
            todo,
            completed,
            blocked
        }

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string? Id { get; set; }
        public required string Title { get; set; }
        public string? Description { get; set; }
        public DateTime Deadline { get; set; }
        public StatusEnum Status { get; set; }
    }
}
