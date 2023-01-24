import styled from 'styled-components';

export const CellsWrapper = styled.div`
    width: 150px;
    height: 150px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
`

export const Cell = styled.div`
    border: 1px solid #000;
`