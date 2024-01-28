import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"


const CommentPostSvg = (props: SvgProps) => (
  <Svg
    width={props.width}
    height={props.height}
    fill="none"
    stroke={props.stroke}
    scale={props.scale}
  >
    <Path
      fill="#424052"
      scale={props.scale}
      d="M7.464 18.916h17.072c.297 0 .546-.1.747-.302.2-.201.3-.451.3-.75a1.02 1.02 0 0 0-1.047-1.042H7.464c-.297 0-.546.101-.747.303-.2.2-.3.45-.3.75a1.02 1.02 0 0 0 1.047 1.042Zm0-5.203h17.072c.297 0 .546-.1.747-.302.2-.201.3-.451.3-.75a1.02 1.02 0 0 0-1.047-1.042H7.464c-.297 0-.546.101-.747.303-.2.2-.3.45-.3.75a1.02 1.02 0 0 0 1.047 1.042Zm0-5.203h17.072c.297 0 .546-.1.747-.302.2-.201.3-.451.3-.75a1.02 1.02 0 0 0-1.047-1.042H7.464c-.297 0-.546.101-.747.303-.2.2-.3.45-.3.75A1.02 1.02 0 0 0 7.464 8.51Zm-4.69 16.656A2.51 2.51 0 0 1 .933 24.4a2.51 2.51 0 0 1-.766-1.84V2.773c0-.716.255-1.33.766-1.84a2.51 2.51 0 0 1 1.84-.766h26.454c.716 0 1.33.255 1.84.766.51.51.766 1.124.766 1.84v25.152c0 .58-.267.981-.8 1.203-.534.223-1.006.13-1.417-.281l-3.68-3.68H2.774Zm24.068-2.093 2.897 3.012V2.773a.49.49 0 0 0-.16-.352.49.49 0 0 0-.352-.16H2.774a.49.49 0 0 0-.353.16.49.49 0 0 0-.16.352V22.56a.49.49 0 0 0 .16.352.49.49 0 0 0 .353.16h24.068Z"
    />
  </Svg>
)
export default CommentPostSvg
