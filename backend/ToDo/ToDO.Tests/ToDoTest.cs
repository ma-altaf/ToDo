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
        public async Task GetTodoItems_ShouldReturnListWithEqualLength(int count)
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


        [Fact]
        public async Task GetTodoItemById_ShouldReturnSameItem()
        {
            // Arrange
            var addTodoItemDto = new AddTodoItemDto
                (
                    Title: "Test",
                    Description: "Test Description",
                    Deadline: DateTime.Now
                );

            var item = await _sut.AddTodoItem(addTodoItemDto);

            var itemId = item.As<OkObjectResult>().Value.As<TodoItem>().Id;

            itemId.Should().NotBeNull();

            // Act
            var result = await _sut.GetTodoItemById(itemId);

            // Assert
            result.Should().NotBeNull();
            result.Should().BeOfType<OkObjectResult>();

            var content = result.As<OkObjectResult>().Value.As<TodoItem>();

            content.Should().NotBeNull();
            content.Id.Should().Be(itemId);
            content.Title.Should().Be(addTodoItemDto.Title);
            content.Description.Should().Be(addTodoItemDto.Description);
            content.Deadline.Should().Be(addTodoItemDto.Deadline);
        }

        [Fact]
        public async Task GetTodoItemById_ShouldReturnNotFound()
        {
            // Arrange
            var incorrectId = "incorrect";

            // Act
            var result = await _sut.GetTodoItemById(incorrectId);

            // Assert
            result.Should().NotBeNull();
            result.Should().BeOfType<NotFoundObjectResult>();

            var notFound = result.As<NotFoundObjectResult>().Value;

            notFound.Should().NotBeNull();

            var content = notFound.As<ErrorDto>();

            content.Message.Should().Be($"{incorrectId} not a valid item id.");
        }


        [Fact]
        public async Task UpdateTodoItemById_ShouldBeUpdatedFully()
        {
            // Arrange
            var addTodoItemDto = new AddTodoItemDto
                (
                    Title: "Test",
                    Description: "Test Description",
                    Deadline: DateTime.Now
                );

            var item = await _sut.AddTodoItem(addTodoItemDto);

            var itemId = item.As<OkObjectResult>().Value.As<TodoItem>().Id;

            itemId.Should().NotBeNull();

            var updatedTodoItem = new UpdateTodoItemDto
                (
                Title: "new Title",
                Description: "new Description",
                Deadline: DateTime.Now.AddDays(1),
                Status: TodoItem.StatusEnum.completed
                );

            // Act
            var result = await _sut.UpdateTodoItemById(itemId, updatedTodoItem);

            // Assert
            result.Should().NotBeNull();
            result.Should().BeOfType<OkObjectResult>();

            var content = result.As<OkObjectResult>().Value.As<TodoItem>();

            content.Should().NotBeNull();
            content.Id.Should().Be(itemId);
            content.Title.Should().Be(updatedTodoItem.Title);
            content.Description.Should().Be(updatedTodoItem.Description);
            content.Deadline.Should().Be(updatedTodoItem.Deadline);
            content.Status.Should().Be(updatedTodoItem.Status);
        }

        [Fact]
        public async Task DeleteTodoItemById_ShouldRemoveItemWithId()
        {
            var itemRefs = new List<string>();

            // Arrange
            var addTodoItemDto = new AddTodoItemDto
                (
                    Title: "Test",
                    Description: "Test Description",
                    Deadline: DateTime.Now
                );

            for (int i = 0; i < 10; i++)
            {
                var item = await _sut.AddTodoItem(addTodoItemDto);
                var itemId = item.As<OkObjectResult>().Value.As<TodoItem>().Id;

                itemId.Should().NotBeNull();

                itemRefs.Add(itemId);
            }

            foreach (string itemId in itemRefs)
            {
                // Act
                var res = await _sut.DeleteTodoItemById(itemId);

                res.Should().NotBeNull();
                res.Should().BeOfType<OkResult>();

                // Assert
                var getItemById = await _sut.GetTodoItemById(itemId);

                getItemById.Should().NotBeNull();
                getItemById.Should().BeOfType<NotFoundObjectResult>();
            }
        }
    }
}
