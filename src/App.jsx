import { useEffect, useState } from "react";
import { TodoItemMemo as TodoItem } from "./components/TodoItem";
import { Form } from "./components/Form";
import { Box, Button, Container, Divider, HStack, Heading, Text, VStack } from "@chakra-ui/react";
import { ColorModeSwitcher } from "./components/ColorModeSwitcher";
import { IoClose } from "react-icons/io5";

function App() {
  const [todo, setTodo] = useState(JSON.parse(localStorage.getItem('todos')) || [new Array()]);
  const [activeTodo, setActiveTodo] = useState(0);
  const checkedList = (todo.length) ? todo[activeTodo].filter((element) => element.checked) : [];
  const uncheckedList = (todo.length) ? todo[activeTodo].filter((element) => !element.checked) : [];

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todo));
  }, [todo]);

  const changeHandler = (itemCheck, id) => {
    const updatedTodo = todo[activeTodo].map((element) => {
      if (element.id === id) {
        return { ...element, checked: itemCheck };
      } else {
        return element;
      }
    });

    const updatedList = todo.map((list, index) => {
      if(index === activeTodo){
        return updatedTodo;
      } else {
        return list;
      }
    })

    setTodo(updatedList);
  };

  const clickRemoveHandler = (id) => {
    const updatedTodo = todo[activeTodo].filter(element => element.id !== id);
    const updatedList = todo.map((list, index) => {
      if(index === activeTodo){
        return updatedTodo;
      } else {
        return list;
      }
    })
    setTodo(updatedList);
  };

  const editInput = (id, updatedValue) => {
    const updatedTodo = todo.map((element) => {
      if (element.id === id) {
        return { ...element, value: updatedValue };
      } else {
        return element;
      }
    });

    setTodo(updatedTodo);
  };

  const addTodoHandler = () => {
    setTodo(prevTodo => [...prevTodo, new Array()]);
    setActiveTodo(prevActiveTodo => prevActiveTodo + 1);
  }

  const deleteTodoHandler = () => {
    const updatedTodo = todo.filter((element, index) => index !== activeTodo);
    setTodo(updatedTodo);
    setActiveTodo(0);
  };

  return (
    <VStack height="100%">
      <HStack width="100%" justify='space-between'>
        <ColorModeSwitcher />
        {todo.length > 1 &&
          <Button onClick={deleteTodoHandler}>
            <IoClose />
          </Button>
        }
      </HStack>
      <Container marginTop={["5rem", "10rem"]}>
        <Heading pb="1rem">My ToDo</Heading>
        <Form setTodo={setTodo} activeTodo={activeTodo} arrayTodo={todo} />
        {uncheckedList.length ? (
          <>
            {uncheckedList.map((element) => (
              <TodoItem
                key={element.id}
                element={element}
                changeHandler={changeHandler}
                clickRemoveHandler={clickRemoveHandler}
                editInput={editInput}
              />
            ))}
          </>
        ) : (
          <Text pt='1rem' align='center'>Nothing to do!</Text>
        )}
        <Box p='1rem'>
          <Divider />
        </Box>
        <Heading size='md'>{checkedList.length} completed item</Heading>
        <>
          {checkedList.map((element) => (
            <TodoItem
              key={element.id}
              element={element}
              changeHandler={changeHandler}
              clickRemoveHandler={clickRemoveHandler}
              editInput={editInput}
            />
          ))}
        </>
      </Container>
      <HStack width="100%" mt="auto" p="1rem">
        <Button onClick={addTodoHandler}>+</Button>
        {todo.map((element, index) => {
          return (
            <Button 
              key={index}
              onClick={() => setActiveTodo(index)}
              isActive={index === activeTodo ? true : false}
            >
              {index}
            </Button>
          )
        })}
      </HStack>
    </VStack>
  );
}

export default App;
