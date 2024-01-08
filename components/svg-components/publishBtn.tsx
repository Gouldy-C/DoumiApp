import * as React from "react"
import Svg, { SvgProps, Mask, Path, G } from "react-native-svg"


const PublishBtn = (props: SvgProps) => (
  <Svg
    width={40}
    height={40}
    fill="none"
    {...props}
  >
    <Mask
      id="a"
      width={40}
      height={40}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
    >
      <Path fill="#D9D9D9" d="M0 0h40v40H0z" />
    </Mask>
    <G mask="url(#a)">
      <Path
        fill="#424052"
        d="M31.656 21.212 7.66 31.302c-.438.177-.852.143-1.242-.103s-.585-.605-.585-1.076V9.867c0-.465.195-.82.585-1.066.39-.246.804-.284 1.242-.113l23.996 10.1c.526.226.788.63.788 1.212 0 .583-.262.986-.788 1.212ZM7.927 28.88 29.098 20l-21.17-8.942v6.718L17.01 20l-9.084 2.18v6.7Z"
      />
    </G>
  </Svg>
)
export default PublishBtn
