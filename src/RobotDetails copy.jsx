import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Box, 
  Container, 
  Heading, 
  SimpleGrid, 
  Card, 
  CardBody, 
  Image, 
  Spinner, 
  Alert, 
  AlertIcon, 
  Text, 
  Flex,
  useColorModeValue,
  ScaleFade,
  Badge
} from '@chakra-ui/react';
import './RobotDetails.css';  // Assuming you will add some global styles here

const RobotDetails = ({ robotName }) => {
  const [robotData, setRobotData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const bgColor = useColorModeValue('gray.100', 'gray.700');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://proto-backend.vercel.app/robots/name/${robotName}`);
        setRobotData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [robotName]);

  if (loading) return <Spinner />;
  if (error) return (
    <Alert status="error">
      <AlertIcon />
      {error.message}
    </Alert>
  );

  const renderProperties = (properties) => {
    if (!properties) return null;
    return Object.entries(properties).map(([key, value]) => (
      <Text key={key}>
        <strong>{key}</strong>: {value}
      </Text>
    ));
  };

  const renderSection = (title, data) => (
    <Card key={title} mb={4} w="300px">
      <CardBody>
        <Heading size="md" mb={2}>
          {title}
        </Heading>
        {data.length > 0 ? (
          data.map((item) => (
            <Box key={item._id} mb={2}>
              <Badge colorScheme="teal" mb={1}>{item.name}</Badge>
              <Text fontWeight="bold">
                Name: {item.name}
              </Text>
              <Text>
                ID: {item.Id}
              </Text>
              {renderProperties(item.properties)}
              {renderProperties(item.features)}
            </Box>
          ))
        ) : (
          <Text>No data available</Text>
        )}
      </CardBody>
    </Card>
  );

  return (
    <Container centerContent p={4} bg={bgColor} minH="100vh" maxW="container.lg">
      <Card w="100%" mb={6} boxShadow="lg">
        <ScaleFade initialScale={0.9} in={true}>
          <Image 
            src={`./${robotName}.jpg`}  // Dynamic image URL
            alt={robotData.robotData.name}
            objectFit="cover"
            h="70vh"
            w="100%"
            borderRadius="md"
          />
        </ScaleFade>
        <CardBody>
          <Heading size="lg" mb={2}>
            {robotData.robotData.name}
          </Heading>
          <Text color="gray.500">
            ID: {robotData.robotData.Id}
          </Text>
        </CardBody>
      </Card>

      <Flex overflowX="auto" w="100%">
        <SimpleGrid spacing={3} minChildWidth="300px">
          {renderSection('Manipulators', robotData.manipulators)}
          {renderSection('Control Modules', robotData.controlModules)}
          {renderSection('Floors', robotData.floors)}
          {renderSection('Basics', robotData.basics)}
          {renderSection('Controllers', robotData.controllers)}
          {renderSection('Additional Options', robotData.additionals)}
          {renderSection('Applications', robotData.applications)}
          {renderSection('Robotwares', robotData.robotwares)}
        </SimpleGrid>
      </Flex>
    </Container>
  );
};

export default RobotDetails;
