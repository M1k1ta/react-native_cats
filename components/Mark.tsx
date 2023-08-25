import React from 'react';
import styled from 'styled-components/native';

const Box = styled.View`
  margin: auto 0;
  flex-direction: row;
  gap: 3px;
`;

const Point = styled.View`
  box-sizing: border-box;
  background-color: rgba(0, 0, 50, 0.6);
  width: 5px;
  height: 5px;
  border-radius: 50px;
  margin: auto;
`;

const Border = styled.View`
  box-sizing: border-box;
  width: 10px;
  height: 10px;
  border-width: 1.25px;
  border-color: rgba(0, 0, 50, 0.7);
  border-style: solid;
  border-radius: 50px;
`;

interface Props {
  mark: number;
};

export const Mark = ({mark}: Props) => {
  const arr = [1, 2, 3, 4, 5];

  return (
    <Box>
      {arr.map(m => (
        <Border key={m}>
          {m <= mark && <Point />}
        </Border>
      ))}
    </Box>
  );
};
