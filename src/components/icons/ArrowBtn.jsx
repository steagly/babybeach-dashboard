export default function ArrowBtn({ className }) {
  return (
    <svg
      className={className}
      width="14"
      height="16"
      viewBox="0 0 14 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_1778_18)">
        <path
          d="M8.92625 12.904C10.2577 13.7513 12 12.7948 12 11.2167L12 4.50335C12 2.92517 10.2577 1.96874 8.92625 2.81602L3.65151 6.17268C2.41651 6.95858 2.41651 8.76142 3.65151 9.54732L8.92625 12.904Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_1778_18"
          x="0.825342"
          y="0.600107"
          width="13.0747"
          height="14.5198"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="0.95" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_1778_18"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_1778_18"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}
