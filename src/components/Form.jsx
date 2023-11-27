import { Input, InputGroup, InputRightElement, Button } from "@chakra-ui/react";
import { useState } from "react";

export const Form = ({setTodo}) => {
  const [inputText, setInputText] = useState("");

  const inputHandler = (e) => {
    setInputText(e.target.value);
  };

  const submitInput = (e) => {
    e.preventDefault();
    //console.log("submit!");
    const input = e.target.querySelector("input");
    const inputValue = input?.value || "";
    const newId = crypto.randomUUID();

    setTodo((prevTodo) => [
      ...prevTodo,
      { id: newId, value: inputValue, checked: false },
    ]);
    setInputText("");
  };

  return (
    <form onSubmit={submitInput}>
      <InputGroup size='md'>
        <Input value={inputText} onChange={inputHandler} placeholder="List item" />
        <InputRightElement width='4.5rem'>
          <Button type='submit' h='1.75rem' size='sm'>
            +
          </Button>
        </InputRightElement>
      </InputGroup>
    </form>
  )
}