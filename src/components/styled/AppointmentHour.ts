import styled from "styled-components";

export const AppointmentHour = styled.span<{ $selected?: boolean }>`
display: inline-block;
border: 1px solid #acbcff;
padding: 5px 10px;
border-radius: 20px;
box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
cursor: pointer;
height: fit-content;

background-color: ${(props) => (props.$selected ? "#0079FF" : "white")};
color: ${(props) => (props.$selected ? "white" : "black")};
`;