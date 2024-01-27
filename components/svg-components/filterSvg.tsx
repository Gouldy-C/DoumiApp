import * as React from "react"
import Svg, { Mask, Path, G, SvgProps } from "react-native-svg"

const FilterSearch = (props: SvgProps) => (
  <Svg
    width={props.width}
    height={props.height}
    fill={props.fill}
    scale={props.scale}
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
        fill="#fff"
        d="M18.974 32.5c-.418 0-.769-.141-1.05-.423a1.427 1.427 0 0 1-.424-1.051v-9.648L8.17 9.526c-.32-.428-.367-.872-.14-1.334.228-.461.612-.692 1.153-.692h21.634c.54 0 .925.23 1.152.692.228.462.181.906-.139 1.334L22.5 21.378v9.648c0 .418-.141.769-.423 1.05a1.427 1.427 0 0 1-1.051.424h-2.052ZM20 20.5 28.25 10h-16.5L20 20.5Z"
      />
    </G>
  </Svg>
)
export default FilterSearch