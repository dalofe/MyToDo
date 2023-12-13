import { useEffect, useState } from "react";
import { TodoItemMemo as TodoItem } from "./components/TodoItem";
import { Form } from "./components/Form";
import { Box, Button, CloseButton, Container, Divider, HStack, Heading, Input, Text, VStack } from "@chakra-ui/react";
import { ColorModeSwitcher } from "./components/ColorModeSwitcher";

function App() {
  const [todo, setTodo] = useState(JSON.parse(localStorage.getItem('todos')) || [new Array({title: 'My ToDo'})]);
  const [activeTodo, setActiveTodo] = useState(0);
  const checkedList = (todo.length) ? todo[activeTodo].filter((element) => element.checked) : [];
  const uncheckedList = (todo.length) ? todo[activeTodo].filter((element) => element.checked !== undefined && !element.checked) : [];

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
    setTodo(prevTodo => [...prevTodo, new Array({title: `MyTodo_${activeTodo + 1}`})]);
    setActiveTodo(prevActiveTodo => prevActiveTodo + 1);
  }

  const deleteTodoHandler = () => {
    const updatedTodo = todo.filter((element, index) => index !== activeTodo);
    setTodo(updatedTodo);
    setActiveTodo(0);
  };

  const title = todo[activeTodo][0]?.title;
  const updateTitleHandler = (e) => {
    const updatedTitle = e.target.value;
    const updatedTodo = todo[activeTodo].map(element => {
      if(element.title !== undefined){
        return {...element, title: updatedTitle}
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
  }

  const handleScrollTabs = (e) => {
    const container = e.target;
    const scrollAmount = e.deltaY;
    container.scrollTo({
      top: 0,
      left: container.scrollLeft + scrollAmount,
      behavior: 'smooth'
    });
  };

  return (
    <VStack height="100vh">
      <HStack width="100%" justify='space-between'>
        <ColorModeSwitcher />
        {todo.length > 1 &&
          <CloseButton onClick={deleteTodoHandler} />
        }
      </HStack>
      <Container marginTop={["5rem", "10rem"]}>
        <Input
          pl={0}
          pb="1rem"
          border="none"
          fontWeight="bold"
          fontSize="3xl"
          value={title}
          onChange={updateTitleHandler}
          _focusVisible={{ boxShadow: 'none'}}
        />
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
      <HStack width="100%" mt="auto" p="1rem" overflowX="auto" flexWrap="nowrap" onWheel={handleScrollTabs}>
        <Button colorScheme='green' onClick={addTodoHandler} width={["100vw","auto"]}>+</Button>
        {todo.map((element, index) => {
          return (
            <Button 
              key={index}
              onClick={() => setActiveTodo(index)}
              isActive={index === activeTodo ? true : false}
              width={["100vw","auto"]}
              minWidth="auto"
            >
              {element[0].title}
            </Button>
          )
        })}
      </HStack>
    </VStack>
  );
}

export default App;
