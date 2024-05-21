import React from "react";

function ShowMessage(props) {
  return (
    <div className="my-5 text-gray-600">
      <p>{props.message}</p>
    </div>
  );
}

export default ShowMessage;
