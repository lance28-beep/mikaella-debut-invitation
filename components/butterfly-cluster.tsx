import type { CSSProperties } from "react"

type ButterflyClusterProps = {
  className?: string
  style?: CSSProperties
  ariaHidden?: boolean
}

const butterflyIds = [1, 2, 3, 4, 5]

export function ButterflyCluster({
  className = "",
  style,
  ariaHidden = true,
}: ButterflyClusterProps) {
  const containerClassName = ["butterfly-canvas", className].filter(Boolean).join(" ")

  return (
    <div className={containerClassName} style={style} aria-hidden={ariaHidden}>
      {butterflyIds.map((id) => (
        <div key={`butterfly-${id}`} className={`bf bf-${id}`}>
          <div className="wing-left">
            <ButterflyWing />
          </div>
          <div className="wing-right">
            <ButterflyWing />
          </div>
        </div>
      ))}
    </div>
  )
}

function ButterflyWing() {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 17 29"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      xmlSpace="preserve"
      style={{
        fillRule: "evenodd",
        clipRule: "evenodd",
        strokeLinejoin: "round",
        strokeMiterlimit: 2,
      }}
    >
      <g transform="matrix(0.0156264,0,0,0.0156264,-5.01358,-5.8732)">
        <path
          d="M1440.74,1614.9C1440.74,1494.13 1440.61,1185.89 1440.61,1065.11C1359.94,917.774 1154.27,576.526 933.987,480.781C758.042,404.081 442.781,320.927 347.826,423.951C309.909,465.096 311.95,525.578 353.949,603.894C495.736,868.494 562.977,1033.61 559.433,1109.67C559.631,1165.3 582.03,1218.62 621.625,1257.7C672.094,1308.02 737.686,1340.44 808.312,1349.98C720.107,1405.47 666.305,1502.53 665.987,1606.74C667.922,1738.19 698.611,1867.63 755.892,1985.96C802.959,2114.05 921.66,2202.78 1057.84,2211.67L1059.66,2211.67C1210.93,2193.6 1319.79,2057.62 1304.35,1906.04C1304.35,1701.95 1387.79,1632.12 1440.74,1614.9Z"
          style={{ fill: "#E9D3A4", fillRule: "nonzero" }}
        />
      </g>
    </svg>
  )
}


