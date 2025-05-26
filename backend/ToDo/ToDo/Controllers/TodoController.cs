using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ToDo.Data;
using ToDo.Dtos;
using ToDo.Models;

namespace ToDo.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TodoController : Controller
    {
        private readonly DataContext ctx;

        public TodoController(DataContext context)
        {
            ctx = context;
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddTodoItem(AddTodoItemDto item)
        {
            if (item.Title.Trim().Length == 0) return BadRequest(new { Message = "Title is required." });

            ctx.TodoItems.Add(new TodoItem
            {
                Title = item.Title.Trim(),
                Description = item.Description?.Trim(),
                Status = TodoItem.StatusEnum.todo
            });
            await ctx.SaveChangesAsync();

            return Ok();
        }

        [HttpGet]
        public async Task<IActionResult> GetTodoItems()
        {
            List<TodoItem> todoItems = await ctx.TodoItems.ToListAsync();

            return Ok(todoItems);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTodoItemById(int id)
        {
            TodoItem? todoItem = await ctx.TodoItems.FindAsync(id);

            if (todoItem == null) return NotFound(new { Message = $"{id} not a valid item id." });

            return Ok(todoItem);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> GetTodoItemById(int id, UpdateTodoItem newItem)
        {
            TodoItem? todoItem = await ctx.TodoItems.FindAsync(id);

            if (todoItem == null) return NotFound(new { Message = $"{id} not a valid item id." });

            if (newItem.Title.Trim().Length == 0) return BadRequest(new { Message = "Title is required." });

            todoItem.Title = newItem.Title.Trim();
            todoItem.Description = newItem.Description?.Trim();

            await ctx.SaveChangesAsync();

            return Ok(todoItem);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTodoItemById(int id)
        {
            TodoItem? todoItem = await ctx.TodoItems.FindAsync(id);

            if (todoItem == null) return NotFound(null);

            ctx.TodoItems.Remove(todoItem);

            await ctx.SaveChangesAsync();
            return Ok();
        }
    }
}
