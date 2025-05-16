using Microsoft.EntityFrameworkCore;
using ToDo.Models;

namespace ToDo.Data
{
    public class DataContext(DbContextOptions options) : DbContext(options)
    {
        public DbSet<TodoItem> TodoItems { get; set; }
    }
}
