import React from "react";

export default function navItem(props) {
  let { title, description, imageUrl, newsUrl, date, source } = props;
  return (
    <div className="card text-center pt-3 my-3 card-simple h-100">
      <img
        className="card-img-top w-75 mx-auto"
        src={
          imageUrl == null
            ? "/src/assets/images/no-picture-available.jpg"
            : imageUrl
        }
        style={{ height: "200px" }}
        onError={({ currentTarget }) => {
          currentTarget.onerror = null;
          currentTarget.src = "/src/assets/images/no-picture-available.jpg";
        }}
        alt="Turn on VPN for Image"
      />
      <div className="card-body">
        <h4 className="card-title">{title}</h4>
        <p className="card-text">{description}</p>
        <p className="card-text">
          <small className="text-muted">
            By {!source ? "Unknown" : source} on {new Date(date).toGMTString()}
          </small>
        </p>
        <a
          rel="noreferrer"
          href={newsUrl}
          target="_blank"
          className="btn btn-sm"
          style={{ backgroundColor: "#2bed9c" }}
        >
          Read More
        </a>
      </div>
    </div>
  );
}
