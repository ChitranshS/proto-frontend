import React from 'react';
import { Box, VStack, Input, FormControl, FormLabel, IconButton } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

const UpdateRobotForm = ({ category, data, setData }) => {
  const handleAddField = () => {
    setData(prevData => ({
      ...prevData,
      [category]: [...prevData[category], { existingId: '', existingName: '', newId: '', newName: '', properties: {}, features: {} }]
    }));
  };

  const handleChange = (index, field, value) => {
    const newData = [...data[category]];
    newData[index][field] = value;
    setData(prevData => ({ ...prevData, [category]: newData }));
  };

  if (category === 'robotData') {
    return (
      <Box>
        <FormLabel>{category}</FormLabel>
        <VStack spacing={2} mb={4}>
          <FormControl>
            <FormLabel>Robot Name</FormLabel>
            <Input 
              value={data[category].name || ''} 
              onChange={(e) => handleChange(0, 'name', e.target.value)} 
              placeholder="Robot Name" 
            />
          </FormControl>
          <FormControl>
            <FormLabel>Robot ID</FormLabel>
            <Input 
              value={data[category].id || ''} 
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
            <FormLabel>Existing ID</FormLabel>
            <Input 
              value={item.existingId || ''} 
              onChange={(e) => handleChange(index, 'existingId', e.target.value)} 
              placeholder="Existing ID" 
            />
          </FormControl>
          <FormControl>
            <FormLabel>Existing Name</FormLabel>
            <Input 
              value={item.existingName || ''} 
              onChange={(e) => handleChange(index, 'existingName', e.target.value)} 
              placeholder="Existing Name" 
            />
          </FormControl>
          <FormControl>
            <FormLabel>New ID</FormLabel>
            <Input 
              value={item.newId || ''} 
              onChange={(e) => handleChange(index, 'newId', e.target.value)} 
              placeholder="New ID" 
            />
          </FormControl>
          <FormControl>
            <FormLabel>New Name</FormLabel>
            <Input 
              value={item.newName || ''} 
              onChange={(e) => handleChange(index, 'newName', e.target.value)} 
              placeholder="New Name" 
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

export default UpdateRobotForm;
