import styled from '@emotion/styled';

export const Thing = styled.div<{ changeButtonStyle: string }>`
  width: ${({ changeButtonStyle }) =>
    changeButtonStyle === 'blue' ? '60px' : changeButtonStyle === 'red' ? '30px' : '90px'};
  height: ${({ changeButtonStyle }) =>
    changeButtonStyle === 'blue' ? '60px' : changeButtonStyle === 'red' ? '90px' : '90px'};
  border-radius: 25px;
  background-color: ${({ changeButtonStyle }) => changeButtonStyle};
`;
