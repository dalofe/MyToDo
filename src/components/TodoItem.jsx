import { Box, Checkbox, InputGroup, Input,InputRightElement, Button } from "@chakra-ui/react";
import { memo, useState } from "react"

const TodoItem = ({element, changeHandler, editInput, clickRemoveHandler}) => {
  const [focusInput, setFocusInput] = useState(false);

  const onBlurHandler = () => {
    setTimeout(() => setFocusInput(false), 150)
  }

  return <Box key={element.id} width='100%'>
            <InputGroup size='md'>
              <Checkbox
                pr='1rem'
                isChecked={element.checked}
                onChange={(e) => changeHandler(e.target.checked, element.id)}
              />
              <Input
                pl={0}
                pr={'4.5rem'}
                type={'text'}
                value={element.value}
                onChange={(e) => editInput(element.id, e.target.value)}
                onFocus={() => setFocusInput(true)}
                onBlur={onBlurHandler}
                _focusVisible={{ boxShadow: 'none'}}
                border={'none'}
              />
              {focusInput && (
                <InputRightElement width='4.5rem'>
                  <Button h='1.75rem' size='sm' onClick={() => clickRemoveHandler(element.id)}>
                    x
                  </Button>
                </InputRightElement>
              )}
            </InputGroup>
        </Box>
}

export const TodoItemMemo = memo(TodoItem);