import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"


const LikedHeart = (props : SvgProps) => (
  <Svg
    width={props.width}
    height={props.height}
    fill={props.fill}
    stroke={props.stroke}
    scale={props.scale}
  >
    <Path
      scale={props.scale}
      d="M15.984 27.99c-.316 0-.63-.058-.943-.175a2.332 2.332 0 0 1-.818-.513l-2.067-1.894c-3.203-2.935-6.002-5.764-8.397-8.488C1.364 14.197.167 11.356.167 8.397c0-2.312.78-4.248 2.339-5.808C4.066 1.03 5.996.25 8.297.25c1.314 0 2.647.323 4 .969 1.352.646 2.586 1.78 3.703 3.403 1.181-1.623 2.427-2.757 3.738-3.403C21.048.573 22.37.25 23.703.25c2.301 0 4.232.78 5.791 2.34 1.56 1.559 2.34 3.495 2.34 5.807 0 2.991-1.223 5.858-3.666 8.602-2.444 2.744-5.223 5.547-8.338 8.407l-2.07 1.896a2.319 2.319 0 0 1-.825.513 2.744 2.744 0 0 1-.951.175Z"
    />
  </Svg>
)

export default LikedHeart

