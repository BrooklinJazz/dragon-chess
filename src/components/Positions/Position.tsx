import styled from "styled-components";
import { secondary, primary } from "../../theme/colors";
interface IPositionProps {
  color: typeof primary | typeof secondary;
}
export const Position = styled.div<IPositionProps>(props => `
  width: 100%;
  height: 100%;
  border: solid 1px black;
  background-color: ${props.color};
`);
