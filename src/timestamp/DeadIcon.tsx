import * as React from "react";
import styled from "styled-components";

import Tippy from "@tippyjs/react";

import Dead from "timestamp/dead.svg";

interface DeadIconProps {}

export const DeadIcon: React.FC<DeadIconProps> = () => (
  <Tippy content="Death">
    <Img src={Dead} alt="Skull" />
  </Tippy>
);

const Img = styled.img`
  display: block;
  height: 1.5rem;
  width: 1.5rem;
`;
