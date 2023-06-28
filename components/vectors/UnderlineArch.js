import * as React from "react"
import Svg, { Path } from "react-native-svg"
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={68}
    height={5}
    fill="none"
    {...props}
  >
    <Path stroke="#CDE7BE" d="M1 1s24.411 6.75 66 0" />
  </Svg>
)
export default SvgComponent
