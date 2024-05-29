import React from 'react';
import { Box, VStack, Input, FormControl, FormLabel, IconButton } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

const RobotForm = ({ category, data, setData }) => {
  const handleAddField = () => {
    setData(prevData => ({
      ...prevData,
      [category]: [...prevData[category], { name: '', id: '', properties: {}, features: {} }]
    }));
  };

  const handleChange = (index, field, value) => {
    if (category === 'robotData') {
      setData(prevData => ({
        ...prevData,
        [category]: { ...prevData[category], [field]: value }
      }));
    } else {
      const newData = [...data[category]];
      newData[index][field] = value;
      setData(prevData => ({ ...prevData, [category]: newData }));
    }
  };

  if (category === 'robotData') {
    return (
      <Box>
        <VStack spacing={2} mb={4}>
          <FormControl>
            <FormLabel>Robot Name</FormLabel>
            <Input 
              value={data[category].name} 
              onChange={(e) => handleChange(0, 'name', e.target.value)} 
              placeholder="Robot Name" 
            />
          </FormControl>
          <FormControl>
            <FormLabel>Robot ID</FormLabel>
            <Input 
              value={data[category].id} 
              onChange={(e) => handleChange(0, 'id', e.target.value)} 
              placeholder="Robot ID" 
            />
          </FormControl>
        </VStack>
      </Box>
    );
  }

  return (
    <Box>
      <FormLabel>{category}</FormLabel>
      {data[category].map((item, index) => (
        <VStack key={index} spacing={2} mb={4}>
          <FormControl>
            <FormLabel>Product Name</FormLabel>
            <Input 
              value={item.name} 
              onChange={(e) => handleChange(index, 'name', e.target.value)} 
              placeholder="Name" 
            />
          </FormControl>
          <FormControl>
            <FormLabel>Product ID</FormLabel>
            <Input 
              value={item.id} 
              onChange={(e) => handleChange(index, 'id', e.target.value)} 
              placeholder="ID" 
            />
          </FormControl>
        </VStack>
      ))}
      <IconButton
        aria-label="Add field"
        icon={<AddIcon />}
        onClick={handleAddField}
        colorScheme="teal"
        mb={4}
      />
    </Box>
  );
};

export default RobotForm;
