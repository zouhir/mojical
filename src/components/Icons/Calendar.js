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
        <polyline
          fill="none"
          stroke={color}
          stroke-width="2"
          stroke-linecap="square"
          stroke-miterlimit="10"
          points="19,3 23,3 23,23 1,23 1,3 5,3 "
          stroke-linejoin="miter"
        />{" "}
        <line
          fill="none"
          stroke={color}
          stroke-width="2"
          stroke-linecap="square"
          stroke-miterlimit="10"
          x1="7"
          y1="3"
          x2="17"
          y2="3"
          stroke-linejoin="miter"
        />{" "}
        <rect
          x="5"
          y="1"
          fill="none"
          stroke="#595968"
          stroke-width="2"
          stroke-linecap="square"
          stroke-miterlimit="10"
          width="2"
          height="4"
          stroke-linejoin="miter"
        />{" "}
        <rect
          x="17"
          y="1"
          fill="none"
          stroke="#595968"
          stroke-width="2"
          stroke-linecap="square"
          stroke-miterlimit="10"
          width="2"
          height="4"
          stroke-linejoin="miter"
        />{" "}
        <line
          fill="none"
          stroke="#595968"
          stroke-width="2"
          stroke-linecap="square"
          stroke-miterlimit="10"
          x1="1"
          y1="9"
          x2="23"
          y2="9"
          stroke-linejoin="miter"
        />
      </g>
    </svg>
  );
};

export default CalIcon;
