import React from 'react';

export default function GoogleApp(props) {
  return (
    <div className="book">
      <h2>{ props.App }</h2>
      <div className="book_category">{ props.Category }</div>
      <div className="book_type">{ props.Type }</div>
      <div className="book_details">
         Rating: {props.Rating} 
      </div>
    </div>
  );
}