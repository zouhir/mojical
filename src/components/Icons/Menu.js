import { h } from "preact";

const CalIcon = ({ color = "#595968", size = 20 }) => {
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
        <rect
          x="1"
          y="1"
          fill="none"
          stroke={color}
          stroke-width="2"
          stroke-linecap="square"
          stroke-miterlimit="10"
          width="9"
          height="9"
          stroke-linejoin="miter"
        />{" "}
        <rect
          data-color="color-2"
          x="14"
          y="1"
          fill="none"
          stroke={color}
          stroke-width="2"
          stroke-linecap="square"
          stroke-miterlimit="10"
          width="9"
          height="9"
          stroke-linejoin="miter"
        />{" "}
        <rect
          data-color="color-2"
          x="1"
          y="14"
          fill="none"
          stroke="#595968"
          stroke-width="2"
          stroke-linecap="square"
          stroke-miterlimit="10"
          width="9"
          height="9"
          stroke-linejoin="miter"
        />{" "}
        <rect
          x="14"
          y="14"
          fill="none"
          stroke="#595968"
          stroke-width="2"
          stroke-linecap="square"
          stroke-miterlimit="10"
          width="9"
          height="9"
          stroke-linejoin="miter"
        />
      </g>
    </svg>
  );
};

export default CalIcon;
