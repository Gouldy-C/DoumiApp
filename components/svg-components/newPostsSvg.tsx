import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"


const NewPostsSvg = (props : SvgProps) => (
  <Svg
  width={props.width}
  height={props.height}
  fill="none"
  >
    <Path
      fill={props.color}
      d="M3.024 29.167a2.51 2.51 0 0 1-1.841-.767 2.51 2.51 0 0 1-.766-1.84V3.44c0-.716.255-1.33.766-1.84a2.51 2.51 0 0 1 1.84-.767h14.898c.297 0 .545.101.746.303.2.202.301.452.301.75s-.1.546-.301.744c-.2.198-.45.297-.746.297H3.024a.49.49 0 0 0-.353.16.49.49 0 0 0-.16.353v23.12a.49.49 0 0 0 .16.352.49.49 0 0 0 .353.16h23.12a.49.49 0 0 0 .352-.16.49.49 0 0 0 .16-.352V11.662c0-.296.1-.545.303-.746.201-.2.451-.3.75-.3a1.02 1.02 0 0 1 1.041 1.047V26.56a2.51 2.51 0 0 1-.766 1.84 2.51 2.51 0 0 1-1.84.767H3.023Zm6.373-6.188c-.296 0-.545-.101-.746-.303a1.021 1.021 0 0 1-.3-.75 1.02 1.02 0 0 1 1.047-1.041h10.388c.297 0 .546.1.746.302.201.202.301.452.301.75s-.1.547-.3.745c-.201.198-.45.297-.747.297H9.397Zm0-5.141c-.296 0-.545-.101-.746-.303a1.022 1.022 0 0 1-.3-.75 1.02 1.02 0 0 1 1.047-1.041h10.388c.297 0 .546.1.746.302.201.202.301.452.301.75a1.02 1.02 0 0 1-1.047 1.041H9.397Zm0-5.142c-.296 0-.545-.1-.746-.302a1.021 1.021 0 0 1-.3-.75 1.02 1.02 0 0 1 1.047-1.041h10.388c.297 0 .546.1.746.302.201.202.301.452.301.75s-.1.546-.3.745c-.201.197-.45.296-.747.296H9.397ZM25.04 9.088a1.02 1.02 0 0 1-1.041-1.047V5.585h-2.455c-.297 0-.546-.1-.746-.302a1.021 1.021 0 0 1-.301-.75 1.02 1.02 0 0 1 1.047-1.041h2.455V1.046c0-.297.1-.545.302-.746.202-.2.452-.301.75-.301a1.02 1.02 0 0 1 1.041 1.047v2.444h2.445c.297 0 .546.101.746.303.201.202.301.452.301.75s-.1.546-.3.744c-.201.198-.45.297-.747.297h-2.444v2.456c0 .296-.101.545-.303.746-.202.2-.452.3-.75.3Z"
      />
  </Svg>
)
export default NewPostsSvg

