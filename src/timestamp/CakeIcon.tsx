import * as React from "react";
import styled from "styled-components";

import Tippy from "@tippyjs/react";

import Cake from "timestamp/cake.svg";

interface CakeIconProps {}

export const CakeIcon: React.FC<CakeIconProps> = () => (
  <Tippy content="Birthday">
    <Img src={Cake} alt="Birthday cake" />
  </Tippy>
);

const Img = styled.img`
  display: block;
  height: 1.5rem;
  width: 1.5rem;
`;
