import styled from "styled-components";

export const AppointmentHour = styled.span<{ $selected?: boolean, $unavailable?: boolean }>`
  display: inline-block;
  border: 1px solid #acbcff;
  padding: 5px 10px;
  border-radius: 20px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  cursor: ${props => props.$unavailable ? "not-allowed" : "pointer"};
  height: fit-content;

  background-color: ${(props) => {
    if (props.$unavailable) {
      return "#ccc"
    }
    return props.$selected ? "#0079FF" : "white"
  }};

  color: ${(props) => {
    if (props.$unavailable) {
      return "#f9f9f9"
    }
    return props.$selected ? "white" : "black"
  }};

  border-color: ${(props) => {
    if (props.$unavailable) { 
      return "transparent"
    }
  }};

  box-shadow: ${(props) => {
    if (props.$unavailable) {
      return "none"
    }
  }};
`;