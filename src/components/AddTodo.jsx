import { AddIcon } from '@chakra-ui/icons'
import {Modal,ModalOverlay,ModalContent,ModalHeader,ModalFooter,ModalBody,Button , ModalCloseButton, useDisclosure, FormControl, FormLabel, Input, Checkbox, RadioGroup, Stack, Radio
} from '@chakra-ui/react'
import React, { useState } from 'react';

import axios from 'axios';
import { failedNotify, successNotify } from '../utils';


function AddTodo ({onAdd}) {


  const [priority, setPriority] = useState();
  // this function will be called when a radio button is checked
  const handlePriority = (e) => {
    setPriority(e.target.value);
  }
  //

  const { isOpen, onOpen, onClose } = useDisclosure();
    const [value, setValue] = React.useState('1')

  const initialRef = React.useRef(null);
  const [todo, setTodo] =useState({
    title:"",
    desc: "",
    date: "",
    completed: false,
    priority:[]
});


  const handleChange =(e)=>{
    //setTodo({...todo, title: e.target.value})
    const newTodo ={...todo};
    newTodo[e.target.name] =e.target.value;
    setTodo(newTodo);
  }
  const handleSubmit = async (e) =>{
    e.preventDefault();
    try {
     
      const response =await axios.post ("http://localhost:3001/todos",todo);
      
      successNotify("Todo has been Added Successfully")

      onAdd(response.data);
      onClose();
    } catch (error){
      failedNotify(error.message)

    }
  }
 
  return (
    <>
      <Button size='sm' colorScheme="cyan" onClick={onOpen}>
        Create Task
       {/* <AddIcon/>*/} 
      </Button>
      
      <Modal size="sm"
        initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose} >

        <ModalOverlay />
        <form onSubmit={handleSubmit}>
          <ModalContent>
          <ModalHeader>Add New Task Here</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={4}>
            <FormControl isRequired>
              <FormLabel>Enter the todo title</FormLabel>
              <Input size='sm'  ref={initialRef} name="title" onChange={handleChange} placeholder='Title'/>
            </FormControl>
            
            <FormControl isRequired>
              <FormLabel>Enter desc</FormLabel>
              <Input size='sm'  ref={initialRef} name="desc" onChange={handleChange} placeholder='desc'/>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Enter end date</FormLabel>
              <Input type = "date" size='sm'  ref={initialRef} name="date" onChange={handleChange} placeholder='date'/>
            </FormControl>

         
             <FormControl mt={6}>
                <FormLabel> Todo Status</FormLabel>
              <Checkbox isInvalid> Completed</Checkbox> <br/>
              
            </FormControl>
            

              <FormLabel> Priority</FormLabel>
             <RadioGroup onChange={setValue} value={value}>
              <Stack direction='row'>
                <Radio value='1'>Low</Radio>
                <Radio value='2'>Medium</Radio>
                <Radio value='3'>High</Radio>
              </Stack>
            </RadioGroup>

  
          </ModalBody>
          <ModalFooter>
            <Button size='sm'  colorScheme='blue' type =" Submit "mr={3}>
              Save
            </Button>
            <Button size='sm'  onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
        </form>
      </Modal>
    </>
  )
}

export default AddTodo 