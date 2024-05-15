import React, { useState } from 'react';
import { ChakraProvider, Box, Heading, Button, VStack, HStack, Flex, Center } from '@chakra-ui/react';
import RobotDetails from './RobotDetails'; // Ensure the path is correct

const App = () => {
  const [selectedRobot, setSelectedRobot] = useState('IRB1300');

  const robotNames = ['IRB1300', 'IRB1200-7']; // Add other robot names as needed

  return (
    <ChakraProvider>
      <Box textAlign="center" p={10}>
        <Heading mb={5}>Robot Details</Heading>
        <Center mb={5}>
          <HStack spacing={4}>
            {robotNames.map((name) => (
              <Button 
                key={name} 
                onClick={() => setSelectedRobot(name)} 
                colorScheme={selectedRobot === name ? 'teal' : 'gray'}
              >
                {name}
              </Button>
            ))}
          </HStack>
        </Center>
        <Flex justify="center" w="100%">
          <RobotDetails robotName={selectedRobot} />
        </Flex>
      </Box>
    </ChakraProvider>
  );
};

export default App;
