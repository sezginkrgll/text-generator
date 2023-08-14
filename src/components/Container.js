import React, { useEffect, useState } from "react";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { fetchText } from "../redux/textSlice";
// Chakra-UI
import {
  Box,
  FormControl,
  FormLabel,
  Heading,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Flex,
  Select,
} from "@chakra-ui/react";
function Container() {
  const text = useSelector((state) => state.text.items);
  const status = useSelector((state) => state.text.status);
  const error = useSelector((state) => state.text.error);

  const [paragraphs, setParagraphs] = useState(4);
  const [textFormat, setTextFormat] = useState("text");

  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchText({ paragraphs, format: textFormat }));
    }
  }, [dispatch, status]);

  const handleInputChange = (value) => {
    setParagraphs(value);
    dispatch(fetchText({ paragraphs: value, format: textFormat }));
  };

  const handleSelectChange = (e) => {
    const value = e.target.value;
    setTextFormat(value);
    dispatch(fetchText({ paragraphs, format: value }));
  };

  if (status === "faild") {
    return <div>{error}</div>;
  }

  return (
    <Box maxW={960} ml="auto" mr="auto" color="white" pl={15} pr={15}>
      <Heading as="h1" textAlign="center" mt={15} mb={15}>
        React sample text generator app
      </Heading>
      <hr />
      <Flex mt={5}>
        <FormControl w="130px">
          <FormLabel>Paragraphs</FormLabel>
          <NumberInput
            value={paragraphs}
            onChange={(valueString) => handleInputChange(Number(valueString))}
            type="number"
            bg="white"
            w="90px"
            color="gray.700"
            borderRadius="lg"
            size="sm"
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <FormControl>
          <FormLabel>Include HTML</FormLabel>
          <Select
            size="sm"
            w="105px"
            bg="white"
            color="gray.700"
            value={textFormat}
            onChange={handleSelectChange}
          >
            <option value="html">Yes</option>
            <option value="text">No</option>
          </Select>
        </FormControl>
      </Flex>

      <Box bg="blue.600" mt={5} p={10} borderRadius="md">
        <p>{text}</p>
      </Box>
    </Box>
  );
}

export default Container;
