﻿using Microsoft.AspNetCore.Mvc;
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
            if (item.Title.Trim().Length == 0) return BadRequest(new ErrorDto("Title is required."));

            try
            {
                var DbItem = ctx.TodoItems.Add(new TodoItem
                {
                    Title = item.Title.Trim(),
                    Description = item.Description?.Trim(),
                    Deadline = item.Deadline,
                    Status = TodoItem.StatusEnum.todo
                });
                await ctx.SaveChangesAsync();

                return Ok(DbItem.Entity);
            }
            catch (Exception ex)
            {
                return BadRequest(new ErrorDto(ex.Message));
            }

        }

        [HttpGet]
        public async Task<IActionResult> GetTodoItems()
        {
            List<TodoItem> todoItems = await ctx.TodoItems.ToListAsync();

            return Ok(todoItems);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTodoItemById(string id)
        {
            TodoItem? todoItem = await ctx.TodoItems.FindAsync(id);

            if (todoItem == null) return NotFound(new ErrorDto($"{id} not a valid item id."));

            return Ok(todoItem);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTodoItemById(string id, UpdateTodoItemDto newItem)
        {
            TodoItem? todoItem = await ctx.TodoItems.FindAsync(id);

            if (todoItem == null) return NotFound(new ErrorDto($"{id} not a valid item id."));

            if (newItem.Title.Trim().Length == 0) return BadRequest(new ErrorDto("Title is required."));

            todoItem.Title = newItem.Title.Trim();
            todoItem.Description = newItem.Description?.Trim();
            todoItem.Deadline = newItem.Deadline;
            todoItem.Status = newItem.Status;

            await ctx.SaveChangesAsync();

            return Ok(todoItem);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTodoItemById(string id)
        {
            TodoItem? todoItem = await ctx.TodoItems.FindAsync(id);

            if (todoItem == null) return NotFound(new ErrorDto($"{id} not a valid item id."));

            ctx.TodoItems.Remove(todoItem);

            try
            {
                await ctx.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return BadRequest(new ErrorDto(ex.Message));
            }

            return Ok();
        }

        [HttpDelete()]
        public async Task<IActionResult> DeleteTodoItems()
        {
            List<TodoItem> todoItems = await ctx.TodoItems.ToListAsync();

            ctx.TodoItems.RemoveRange(todoItems);

            try
            {
                await ctx.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return BadRequest(new ErrorDto(ex.Message));
            }

            return Ok();
        }
    }
}
