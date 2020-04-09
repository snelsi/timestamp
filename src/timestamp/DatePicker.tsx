import * as React from "react";
import styled from "styled-components";

import DatePickerInput from "react-date-picker";

interface DatePickerProps {
  onChange: (newDate: Date) => void;
  value: Date;
}

export const DatePicker: React.FC<DatePickerProps> = ({ onChange, value }) => (
  <Container>
    <DatePickerInput onChange={onChange} value={value} format="y-MM-dd" />
  </Container>
);

const Container = styled.div`
  @media (min-width: 1000px) {
    position: absolute;
    top: 1em;
    right: 1em;
  }

  & .react-date-picker__wrapper {
    border: none;
    border-bottom: 1px solid black;
  }
  & .react-date-picker__inputGroup {
    padding: 0.5em;
    font-size: 1.25em;
  }

  & .react-date-picker__button {
    padding: 0.5em 1em;
  }

  & .react-date-picker__clear-button {
    display: none;
  }
`;