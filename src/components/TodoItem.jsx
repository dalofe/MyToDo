import { Box, Checkbox, InputGroup, Input,InputRightElement, Button } from "@chakra-ui/react";
import { memo } from "react"

const TodoItem = ({element, changeHandler, editInput, clickRemoveHandler}) => {
  return <Box key={element.id} width='100%'>
            <InputGroup size='md'>
              <Checkbox
                isChecked={element.checked}
                onChange={(e) => changeHandler(e.target.checked, element.id)}
              />
              <Input
                pr='4.5rem'
                type={'text'}
                value={element.value}
                onChange={(e) => editInput(element.id, e.target.value)}
                border={'none'}
              />
              <InputRightElement width='4.5rem'>
                <Button h='1.75rem' size='sm' onClick={() => clickRemoveHandler(element.id)}>
                  x
                </Button>
              </InputRightElement>
            </InputGroup>
        </Box>
}

export const TodoItemMemo = memo(TodoItem);