import { AddIcon } from '@chakra-ui/icons'
import { FaEdit } from 'react-icons/fa';
import {Modal,ModalOverlay,ModalContent,ModalHeader,ModalFooter,ModalBody,Button , ModalCloseButton, useDisclosure, FormControl, FormLabel, Input, Icon, Checkbox
} from '@chakra-ui/react'
import React, { useState } from 'react';
import axios from 'axios';
import { failedNotify, successNotify } from '../utils';


function UpdateTodo ({todo: todoToUpdate, onUpdate}) {
  const [todo, setTodo] =useState(todoToUpdate);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);

  const handleChange =(e)=>{
    const updateTodo ={...todo};
    if (e.target.type === "checkbox")
      updateTodo[e.target.name] = e.target.checked;
    else updateTodo[e.target.name] = e.target.value;
    setTodo(updateTodo);

  }
  const handleSubmit = async (e) =>{
    e.preventDefault();
    try {
     
      const response =await axios.put ( `http://localhost:3001/todos/${todo.id}`,todo);
      
      successNotify("Todo has been updated Successfully");

      onUpdate(response.data);
      onClose();
    } catch (error){
      failedNotify(error.message)

    }
  }
 
 

  return (
    <>
      
       <Button size="sm"_hover= {{bg:"green.600", color:"black"}} _active= {{bg:"green.900", color:"black"}}variant="ghost" onClick = {onOpen}> <Icon as ={FaEdit}/>
       </Button>
      
      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <form onSubmit={handleSubmit}>
          <ModalContent>
          <ModalHeader>Update Todo</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isRequired>
              <FormLabel>Enter the Todo Title</FormLabel>
              <Input ref={initialRef} value ={todo.title} placeholder='Title' 
              name="title"
              onChange={handleChange} />
            </FormControl>
            <FormControl>
                <FormLabel> Todo Status</FormLabel>
              <Checkbox  name="completed" isChecked={todo.completed} onChange={handleChange}>Completed</Checkbox>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} type="submit">
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
        </form>
        
      </Modal>
    </>
  )
}

export default UpdateTodo 