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
        <path
          data-cap="butt"
          fill="none"
          stroke={color}
          stroke-width="2"
          stroke-miterlimit="10"
          d="M20.7,9.4c0.2,0.8,0.3,1.7,0.3,2.6 c0,5.5-4.5,10-10,10S1,17.5,1,12S5.5,2,11,2c1.9,0,3.7,0.5,5.3,1.5"
          stroke-linejoin="miter"
          stroke-linecap="butt"
        />{" "}
        <polyline
          data-color="color-2"
          fill="none"
          stroke={color}
          stroke-width="2"
          stroke-linecap="square"
          stroke-miterlimit="10"
          points=" 7,10 11,14 22,3 "
          stroke-linejoin="miter"
        />
      </g>
    </svg>
  );
};

export default CalIcon;
