import React from "react";

const Color = (props) => {
  const { color, onColorChange } = props;

  return (
    <>
      <ul className="colors ps-0">
        {color?.map((colorItem) => (
          <li
            key={colorItem.col_code}
            style={{ backgroundColor: colorItem.col_code }}
            className="color"
            onClick={() => onColorChange(colorItem.col_code)}
          >
          </li>
        ))}
      </ul>
    </>
  );
};

export default Color;



// import React from "react";

// const Color = (props) => {
//   const { color } = props;

//   return (
//     <>
//       <ul className="colors ps-0">
//         {color?.map((colorItem) => (
//           <li
//             key={colorItem.col_code}
//             style={{ backgroundColor: colorItem.col_code }}
//             className="color"
//           >
//           </li>
//         ))}
//       </ul>
//     </>
//   );
// };



// export default Color;





// const Color = (props) => {
//   console.log(props);
//   const { color } = props;

//   return (
//     <>
//       <ul className="colors ps-0">
//         <li></li>
//         <li></li>
//         <li></li>
//         <li></li>
//       </ul>
//     </>
//   );
// };
