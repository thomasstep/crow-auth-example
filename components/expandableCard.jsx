import React, { useState } from 'react';

export default function ExpandableCard(props) {
  const {
    expanded,
    expandedToggle,
    title,
    children,
  } = props;

  return (
    <div
      className="bg-white shadow flex flex-col items-start p-6 mt-6 text-left border rounded-xl w-10/12"
    >
      <div className="self-stretch flex flex-row justify-between">
        <h3 className="text-xl font-bold truncate md:pr-0 pr-4">{title}</h3>
        <svg
          x="0px"
          y="0px"
          className="md:h-8 md:w-8 h-12 w-12 fill-current cursor-pointer hover:text-purple-500 focus:text-purple-500"
          viewBox="0 0 255 255"
          transform={expanded ? "rotate(180)" : null}
          onClick={() => expandedToggle(!expanded)}>
          <style>
            enable-background:new 0 0 255 255;
          </style>
          <g>
            <g id="arrow-drop-down">
              <polygon points="0,63.75 127.5,191.25 255,63.75 		"/>
            </g>
          </g>
        </svg>
      </div>
      {children}
    </div>
  );
}
