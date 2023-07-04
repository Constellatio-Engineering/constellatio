import styled from "@emotion/styled";
import Image from "next/image";
import Constellatio from "../../../../public/constellatio.svg";

const Navbar = styled.nav`
  padding: 16px;
  display: flex;
  justify-content: center;
`;

export function AuthHeader() {
  return (
    <Navbar>
      <Image src={Constellatio} alt="Constellatio" />
    </Navbar>
  );
}
