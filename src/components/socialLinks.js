import React from "react";
import { Instagram, Twitter, Youtube, UAL } from "./icons";
import styled from "styled-components";

const Wrapper = styled.div`
  position: fixed;
  right: 0;
  bottom: 0;

  svg {
    fill: ${(props) => props.theme.black};
  }
`;

const SocialLinks = () => (
  <Wrapper className="d-none d-md-flex m-4 flex-column">
    <a
      href="https://www.arts.ac.uk/creative-computing-institute"
      className="mb-3 mx-auto"
    >
      <UAL />
    </a>
    <a
      href="https://www.youtube.com/channel/UCtj43Vmw85ghSncJHW1xBVA"
      className="mb-3"
    >
      <Youtube />
    </a>
    <a
      href="https://twitter.com/ual_cci?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor"
      className="mb-3"
    >
      <Twitter />
    </a>
    <a href="https://www.instagram.com/ual_cci/?hl=en">
      <Instagram />
    </a>
  </Wrapper>
);

export default SocialLinks;
