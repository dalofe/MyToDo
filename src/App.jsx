import { useState } from "react";
import { TodoItemMemo as TodoItem } from "./components/TodoItem";
import { Form } from "./components/Form";
import { Box, Container, Divider, Heading, Text } from "@chakra-ui/react";
import { ColorModeSwitcher } from "./components/ColorModeSwitcher";

const initialList = [
  { id: "0", value: "orange", checked: false },
  { id: "1", value: "paper", checked: false },
  { id: "2", value: "bread", checked: false },
  { id: "3", value: "tomatoes", checked: true },
];

function App() {
  const [todo, setTodo] = useState(initialList);

  const checkedList = todo.filter((element) => element.checked);
  const uncheckedList = todo.filter((element) => !element.checked);

  //console.log("todo: ", todo);

  const changeHandler = (itemCheck, id) => {
    const updatedTodo = todo.map((element) => {
      if (element.id === id) {
        return { ...element, checked: itemCheck };
      } else {
        return element;
      }
    });

    setTodo(updatedTodo);
  };

  const clickRemoveHandler = (id) => {
    setTodo(todo.filter((element) => element.id !== id));
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

  return (
    <>
      <Box textAlign="right">
        <ColorModeSwitcher />
      </Box>
      <Container marginTop="5rem">
        <Heading pb="1rem">My ToDo3</Heading>
        <Form setTodo={setTodo} />
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
          <Text>Nothing to do!</Text>
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
    </>
  );
}

export default App;
