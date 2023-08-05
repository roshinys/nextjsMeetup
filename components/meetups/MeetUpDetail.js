import React from "react";
import classes from "./MeetUpDetail.module.css";
import Image from "next/image";

function MeetUpDetail(props) {
  return (
    <section className={classes.detail}>
      <Image src={props.image} alt={props.title} width={100} height={100} />
      <h1>{props.title}</h1>
      <address>{props.address}</address>
      <p>{props.description}</p>
    </section>
  );
}

export default MeetUpDetail;
