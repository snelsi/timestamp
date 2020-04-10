import * as React from "react";
import styled from "styled-components";

import DatePickerInput from "react-date-picker";

import { CakeIcon, DeadIcon } from "timestamp";

interface DatePickerProps {
  onBirthdayChange: (newDate: Date) => void;
  birthdayValue: Date;
  onDeathChange: (newDate: Date) => void;
  deathValue: Date;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  onBirthdayChange,
  birthdayValue,
  onDeathChange,
  deathValue,
}) => (
  <Container>
    <DatePickerInput
      onChange={onBirthdayChange}
      value={birthdayValue}
      format="y-MM-dd"
      clearIcon={null}
      calendarIcon={<CakeIcon />}
    />
    <DatePickerInput
      minDate={birthdayValue}
      onChange={onDeathChange}
      value={deathValue}
      format="y-MM-dd"
      calendarIcon={<DeadIcon />}
      clearIcon={deathValue === null ? null : undefined}
    />
  </Container>
);

const Container = styled.div`
  display: grid;
  gap: 1em;

  @media (min-width: 1000px) {
    position: absolute;
    margin: 0 !important;
    top: 1rem;
    right: 1rem;
  }

  & .react-date-picker__wrapper {
    border: none;
    border-bottom: 1px solid var(--border-color, black);
    min-width: 200px;
  }
  & .react-date-picker__inputGroup {
    padding: 0.5em;
    font-size: 1.25em;
  }
  & .react-date-picker__inputGroup__input {
    color: inherit;
  }

  & .react-date-picker__button {
    padding: 0.5em;

    @media (prefers-color-scheme: dark) {
      & svg {
        stroke: white;
        fill: white;
      }
    }
  }
`;
