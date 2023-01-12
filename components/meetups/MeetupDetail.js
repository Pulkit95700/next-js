import React from 'react';
import classes from "./MeetupDetail.module.css";

const MeetupDetail = (props) => {
  return (
    <div className={classes['center-box']}>
        <img src={props.image} />
        <h1>{props.title}</h1>
        <address>{props.address}</address>
        <p>{props.description}</p>
    </div>
  )
}

export default MeetupDetail