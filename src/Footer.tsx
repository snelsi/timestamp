import * as React from "react";
import styled from "styled-components";

interface FooterProps {}

export const Footer: React.FC<FooterProps> = () => (
  <FooterElem>
    <a href="https://snelsi.now.sh" target="_blank" rel="noopener noreferrer">
      Roman Zhuravlov
    </a>
    <div>© 2020</div>
  </FooterElem>
);

const FooterElem = styled.footer`
  text-align: center;
  font-size: 1rem;
  margin: 1rem;

  & > a {
    display: block;
  }
`;
