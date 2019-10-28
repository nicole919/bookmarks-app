import React from "react";
import "./bookmark.css";
import PropTypes from "prop-type";
import Rating from "../rating/rating";

export default function Bookmark(props) {
  Bookmark.propTypes = {
    title: PropTypes.string.isRequired,
    url: (props, propName, componentName) => {
      // get the value of the prop
      const prop = props[propName];

      // do the isRequired check
      if (!prop) {
        return new Error(
          `${propName} is required in ${componentName}. Validation Failed`
        );
      }

      // check the type
      if (typeof prop != "string") {
        return new Error(
          `Invalid prop, ${propName} is expected to be a string in ${componentName}. ${typeof prop} found.`
        );
      }

      // do the custom check here
      // using a simple regex
      if (prop.length < 5 || !prop.match(new RegExp(/^https?:\/\//))) {
        return new Error(
          `Invalid prop, ${propName} must be min length 5 and begin http(s)://. Validation Failed.`
        );
      }
    },
    rating: PropTypes.number,
    description: PropTypes.string
  };
  return (
    <div className="bookmark">
      <div className="bookmark__row">
        <div className="bookmark__title">
          <a href={props.url} target="_blank" rel="noopener noreferrer">
            {props.title}
          </a>
        </div>
        <Rating value={props.rating} />
      </div>
      <div className="bookmark__description">{props.description}</div>
    </div>
  );
}
Bookmark.defaultProps = {
  rating: 1,
  description: ""
};
