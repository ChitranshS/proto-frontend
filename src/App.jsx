import React, { useState, useEffect } from 'react';
import { ChakraProvider, Box, Heading, Button,Image, VStack, Flex, SimpleGrid, Text, useToast, Spinner } from '@chakra-ui/react';
import axios from 'axios';
import RobotDetails from './RobotDetails';
import RobotForm from './RobotForm'; // Ensure the path is correct

const App = () => {
  const [selectedRobot, setSelectedRobot] = useState(null);
  const [robotNames, setRobotNames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddRobotForm, setShowAddRobotForm] = useState(false);
  const [formData, setFormData] = useState({
    robotData: { name: '', id: '' },
    Manipulators: [],
    'Control Modules': [],
    Floors: [],
    Basics: [],
    Controllers: [],
    'Additional Options': [],
    Applications: [],
    Robotwares: []
  });

  const fetchRobotNames = async () => {
    try {
      const response = await axios.get('https://proto-backend.vercel.app/robots/names');
      setRobotNames(response.data.map(robot => robot.name));
    } catch (error) {
      console.error('Error fetching robot names:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRobotNames();
  }, []);

  const handleRobotClick = (name) => {
    setSelectedRobot(name);
    setShowAddRobotForm(false); // Hide the form when a robot name is clicked
  };

  const toggleAddRobotForm = () => {
    setShowAddRobotForm(!showAddRobotForm);
    setSelectedRobot(null); // Deselect any selected robot
  };

  const toast = useToast();

  const handleSubmit = async () => {
    const formattedData = {
      robotData: {
        Id: formData.robotData.id,
        name: formData.robotData.name
      },
      manipulators: formData.Manipulators.map(item => ({
        Id: item.id,
        name: item.name,
        additionalFields: item.properties // or any additional fields
      })),
      controlModules: formData['Control Modules'].map(item => ({
        Id: item.id,
        name: item.name,
        additionalFields: item.properties // or any additional fields
      })),
      floors: formData.Floors.map(item => ({
        Id: item.id,
        name: item.name,
        additionalFields: item.properties // or any additional fields
      })),
      basics: formData.Basics.map(item => ({
        Id: item.id,
        name: item.name,
        additionalFields: item.properties // or any additional fields
      })),
      controllers: formData.Controllers.map(item => ({
        Id: item.id,
        name: item.name,
        additionalFields: item.properties // or any additional fields
      })),
      additionals: formData['Additional Options'].map(item => ({
        Id: item.id,
        name: item.name,
        additionalFields: item.properties // or any additional fields
      })),
      applications: formData.Applications.map(item => ({
        Id: item.id,
        name: item.name,
        additionalFields: item.properties // or any additional fields
      })),
      robotwares: formData.Robotwares.map(item => ({
        Id: item.id,
        name: item.name,
        additionalFields: item.properties // or any additional fields
      }))
    };

    console.log('Submitting data:', formattedData);  // Debugging log

    try {
      const response = await axios.post('https://proto-backend.vercel.app/robots/insert', formattedData);
      toast({
        title: "Data saved.",
        description: "Your data has been successfully saved to the database.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error saving data:', error);  // Detailed error log
      toast({
        title: "Error saving data.",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <ChakraProvider>
      <Flex h="100vh" p={5}>
        <Box w="20%" p={5} borderRight="1px solid lightgray">
          <Heading mb={5}>Robot Models</Heading>
          <VStack spacing={4} align="stretch">
            {robotNames.map((name) => (
              <Button 
                key={name} 
                onClick={() => handleRobotClick(name)} 
                colorScheme={selectedRobot === name ? 'teal' : 'gray'}
              >
                {name}
              </Button>
            ))}
          </VStack>
          <Button mt={4} colorScheme="teal" onClick={toggleAddRobotForm}>
            {showAddRobotForm ? 'Cancel' : 'Add Robot'}
          </Button>
        </Box>
        <Box w="80%" p={5}>
          {showAddRobotForm ? (
            <Box>
              <Heading size="lg" mb={4}>Add Robot Details</Heading>
              <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={4}>
                {Object.keys(formData).map((category) => (
                  <RobotForm 
                    key={category} 
                    category={category} 
                    data={formData} 
                    setData={setFormData} 
                  />
                ))}
              </SimpleGrid>
              <Button mt={4} colorScheme="teal" onClick={handleSubmit}>
                Submit All Data
              </Button>
            </Box>
          ) : selectedRobot ? (
            <RobotDetails robotName={selectedRobot} />
          ) : (
            <Box>
              <Heading size="lg" mb={4}>Welcome to Robot Details</Heading>
              <Text>Please select a robot model from the left sidebar to view its details.</Text>
              <br></br>
              <Image 
            src='welcome.jpg'  // Dynamic image URL
            alt='Robot Image'
            objectFit="cover"
            h ="80vh"
            borderRadius="md"
          />
            </Box>
          )}
        </Box>
      </Flex>
    </ChakraProvider>
  );
};

export default App;
