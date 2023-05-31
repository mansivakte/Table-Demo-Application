import React from "react";
import ReactLoading from "react-loading";

export default function Loader() {
  return (
    <div>
      <center>
        {/* <h5>Loading....!</h5> */}
        {/* <ReactLoading type="balls" color="#0000FF" height={100} width={50} />
      <ReactLoading type="bars" color="#0000FF" height={100} width={50} />
      <ReactLoading type="bubbles" color="#0000FF" height={100} width={50} />
      <ReactLoading type="cubes" color="#0000FF" height={100} width={50} />
      <ReactLoading type="cylon" color="#0000FF" height={100} width={50} />
      <ReactLoading type="spin" color="#0000FF" height={100} width={50} /> */}
        {/* <ReactLoading type="spokes" color="#0000FF" height={100} width={50} /> */}
        {/* <ReactLoading
          type="spinningBubbles"
          color="#4C4646"
          height={300}
          width={150}
        /> */}
        <ReactLoading type="spin" color="#4C4646" height={70} width={100} />
      </center>
    </div>
  );
}
