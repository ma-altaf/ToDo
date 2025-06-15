using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ToDo.Controllers;
using ToDo.Data;
using ToDo.Dtos;
using ToDo.Models;

namespace ToDO.Tests
{
    public class ToDoTest
    {
        private readonly TodoController _sut;

        public ToDoTest()
        {
            DbContextOptions options = new DbContextOptionsBuilder().UseInMemoryDatabase(Guid.NewGuid().ToString()).Options;
            var context = new DataContext(options);
            _sut = new TodoController(context);
        }

        [Fact]
        public async Task AddTodoItem_ShouldReturnTodo()
        {
            // Arrange
            var addTodoItemDto = new AddTodoItemDto
            (
                Title: "Test",
                Description: "Test Description",
                Deadline: DateTime.Now
            );

            // Act
            var result = await _sut.AddTodoItem(addTodoItemDto);

            // Assert
            result.Should().NotBeNull();
            result.Should().BeOfType<OkObjectResult>();

            var content = result.As<OkObjectResult>().Value.As<TodoItem>();

            content.Should().NotBeNull();
            content.Id.Should().BeOfType<String>();
            content.Title.Should().Be(addTodoItemDto.Title);
            content.Description.Should().Be(addTodoItemDto.Description);
            content.Deadline.Should().Be(addTodoItemDto.Deadline);
        }

        [Theory]
        [InlineData(0)]
        [InlineData(5)]
        [InlineData(10)]
        public async Task GetTodoItems_ShouldReturnEmptyList(int count)
        {
            // Arrange
            var addTodoItemDto = new AddTodoItemDto
            (
                Title: "Test",
                Description: "Test Description",
                Deadline: DateTime.Now
            );

            for (int i = 0; i < count; i++)
            {
                await _sut.AddTodoItem(addTodoItemDto);
            }

            // Act
            var result = await _sut.GetTodoItems();

            // Assert
            result.Should().NotBeNull();
            result.Should().BeOfType<OkObjectResult>();

            var content = result.As<OkObjectResult>().Value.As<List<TodoItem>>();

            content.Should().NotBeNull();
            content.Count.Should().Be(count);
        }
    }
}
