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
        private readonly DataContext _context;
        public TodoController(DataContext context)
        {
            _context = context;
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddTodoItem(AddTodoItemDto item)
        {
            _context.TodoItems.Add(new TodoItem
            {
                Title = item.Title,
                Description = item.Description,
                Status = TodoItem.StatusEnum.todo
            });
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpGet]
        public async Task<IActionResult> getTodoItems()
        {
            List<TodoItem> todoItems = await _context.TodoItems.ToListAsync();

            return Ok(todoItems);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> getTodoItemById(int id)
        {
            TodoItem? todoItem = await _context.TodoItems.FindAsync(id);

            if (todoItem == null) return NotFound(new { Message = $"{id} not a valid item id." });

            return Ok(todoItem);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> getTodoItemById(int id, UpdateTodoItem newItem)
        {
            TodoItem? todoItem = await _context.TodoItems.FindAsync(id);

            if (todoItem == null) return NotFound(new { Message = $"{id} not a valid item id." });

            todoItem.Title = newItem.Title;
            todoItem.Description = newItem.Description;

            await _context.SaveChangesAsync();

            return Ok(todoItem);
        }
    }
}
