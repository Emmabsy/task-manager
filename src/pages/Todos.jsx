import { DeleteIcon } from '@chakra-ui/icons';
import { Box, HStack, Input, Select, Button, Grid, GridItem, Text, Badge, Heading, Center, } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import AddTodo from '../components/AddTodo';
import UpdateTodo from '../components/UpdateTodo';
import { failedNotify, successNotify } from '../utils';

const Todos = () => {
  const [todos, setTodos] = useState([]);

  const [searchText, setSearchText] = useState("");
  const [filter, setFilter] = useState("");

  let allTodos = todos;

  // search
  if (searchText) {
    allTodos = todos.filter((todo) =>
      todo.title.toLowerCase().includes(searchText.toLowerCase())
    );
  }

  // filter
  if (filter) {
    allTodos = allTodos.filter(
      (todo) =>
        (filter === "completed" && todo.completed) ||
        (filter === "pending" && !todo.completed)
    );
  }


  const addTodo =(todo)=> {
    setTodos([todo, ...todos])
  };

  const updateTodo = (todo) => {
    const allTodos = [...todos];
    const index = todos.findIndex((t) => t.id === todo.id);

    allTodos[index] = todo;
    setTodos(allTodos);
  };

  const deletedTodo = async (todo) =>{
     try {
      const response =await axios.delete (`http://localhost:3001/todos/${todo.id}`,
      todo);
      let newTodos= todos.filter ((t) => t.id !== todo.id)
      setTodos(newTodos);
      successNotify("Todo has been deleted Successfully");  
    } catch (error){
      failedNotify(error.message)

    }

  }

  useEffect(()=>  {
    const fetchTodos = async ()=>{
      try{
       const response= await axios.get("http://localhost:3001/todos");
       console.log(response.data);
       setTodos(response.data);
      } catch (error) {}
    };
    fetchTodos();
  }, []);

  return (
    <Box bg="gray.200" w="100%" height="100%" p={4} color="white">
      <Center> <Heading as='h4' size='md' m="4" color="black">Todo List </Heading></Center>
     
      <HStack>
        <Select bg="white" color="black"  w="10%" onChange={(e) => setFilter(e.target.value)} >
          <option value="">All Todos</option>
          <option value="pending">Not Started</option>
          <option value="pending">InProgress</option>
          <option value="completed">Completed</option>
          
        </Select>
       
        <AddTodo onAdd={addTodo} />

        <Input bg="white" color="black" placeholder="Search todos ...." onChange={(e) => setSearchText(e.target.value)} />
          

      </HStack>    
      <br/>

      <Grid templateColumns="repeat(3, 1fr)" gap="6" my="4">
        {allTodos.map((todo) => (
          <GridItem key={todo.id}>
            <Box bg="cyan.500" color="black" p={3} boxShadow="outline" rounded="md" >
              <HStack justifyContent="space-between">
                <Text fontWeight="bold" w="100%" noOfLines="1"> Title: {todo.title} </Text> 
                <Button size="sm" color="red.600" _hover={{ bg: "red.600", color: "white" }} _active={{ bg: "red.900", color: "white" }} variant="ghost" onClick={() => { deletedTodo(todo); }}>
                  <DeleteIcon />
                </Button>
                <UpdateTodo todo={todo} onUpdate={updateTodo} />
              </HStack>

              <HStack>
                <Text fontWeight="bold" w="100%" noOfLines="3"> Desc: {todo.desc} </Text>
              </HStack>

               <HStack>
                <Text fontWeight="bold" w="100%" noOfLines="3"> End Date: {todo.date} </Text>
              </HStack>

              <Text fontWeight="bold" mt={2}>
                Status:{" "}
                <Badge
                  variant="subtle"
                  colorScheme={todo.completed ? "green" : "red"}
                >
                  {todo.completed ? "completed" : "pending"}
                </Badge>{" "}
              </Text>

      

             

            </Box>
          </GridItem>
        ))}
      </Grid>
    </Box>
  )
}

export default Todos