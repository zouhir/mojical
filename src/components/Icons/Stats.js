import { h } from "preact";

const CalIcon = ({ color = "#595968" }) => {
  return (
    <svg
      x="0px"
      y="0px"
      width="24px"
      height="24px"
      viewBox="0 0 24 24"
      stroke-width="2"
    >
      <g stroke-width="2" transform="translate(0, 0)">
        <polygon
          fill="none"
          stroke={color}
          stroke-width="2"
          stroke-linecap="square"
          stroke-miterlimit="10"
          points="13,3 3,14 12,14 11,21 21,10 12,10 "
          stroke-linejoin="miter"
        />
      </g>
    </svg>
  );
};

export default CalIcon;
