 {/*
 style={{'backgroundColor': priority === 'low' ? 'blue' : priority=== 'medium' ? 'green' : 'red'}}

 <Text fontWeight="bold" mt={2}>
                Status:{" "}
                <Badge variant="subtle" colorScheme={todo.completed ? "green" : "red"}>
                  {todo.completed ? "completed" : "pending"}
                </Badge>{" "}
              </Text>


              <Text fontWeight="bold" mt={2}>
                Status:{" "}
                <Badge  colorScheme={todo.priority = 'notstarted' ? 'blue' : todo.priority='medium' ? 'green' : 'red'}> 
                </Badge>{" "}

              </Text>











 <FormLabel> Status</FormLabel>
             <RadioGroup onChange={setValue} value={value}>
              <Stack direction='row'>
                <Radio value='1' >Low</Radio>
                <Radio value='2'>Medium</Radio>
                <Radio value='3'>High</Radio>
              </Stack>
            </RadioGroup>


/*}