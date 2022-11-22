import styled from 'styled-components';

type GridLayoutProps = {
  length: number;
}

export const GridLayout = styled.div<GridLayoutProps>`
  --chart-header-cell-height: 24px;
  --chart-column-size: 22px;
  --chart-row-size: 40px;
  --chart-length: ${({ length }) => length};
  display: grid;
  grid-template-columns: 390px repeat(var(--chart-length), var(--chart-column-size));
  grid-template-rows: repeat(2, var(--chart-header-cell-height)) repeat(10, minmax(20px, var(--chart-row-size)));
  grid-auto-flow: dense;
  border: 1px solid var(--color-grey);
  border-radius: 10px 0px 0px 10px;
  overflow: hidden;
`;