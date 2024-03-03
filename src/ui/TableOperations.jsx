import styled from "styled-components";

const StyledTableOperations = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
`;

export default function TableOperations({ children }) {
  return <StyledTableOperations>{children}</StyledTableOperations>;
}
