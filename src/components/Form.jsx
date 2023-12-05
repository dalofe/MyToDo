import { Input, InputGroup, InputRightElement, Button } from "@chakra-ui/react";
import { useState, useRef } from "react";

export const Form = ({setTodo}) => {
  const [inputText, setInputText] = useState("");
  const inputRef = useRef(null);

  const inputHandler = (e) => {
    setInputText(e.target.value);
  };

  const submitInput = (e) => {
    e.preventDefault();
    const input = e.target.querySelector("input");
    const inputValue = input?.value || "";
    const newId = crypto.randomUUID();

    setTodo((prevTodo) => [
      ...prevTodo,
      {id: newId, value: inputValue, checked: false},
    ]);
    setInputText("");
    inputRef.current.focus();
  };

  return (
    <form onSubmit={submitInput}>
      <InputGroup size='md'>
        <Input value={inputText} onChange={inputHandler} placeholder="List item" ref={inputRef} />
        <InputRightElement width='4.5rem'>
          <Button type='submit' h='1.75rem' size='sm'>
            +
          </Button>
        </InputRightElement>
      </InputGroup>
    </form>
  )
}