// import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';

// function AddColorForm({ addColor }) {
//   const [formData, setFormData] = useState({
//     string: '',
//   });

//   const history = useHistory();

//   const handleChange = evt => {
//     const { name, value } = evt.target;
//     setFormData(fData => ({
//       ...fData,
//       [name]: value,
//     }));
//   };

//   function handleSubmit(evt) {
//     evt.preventDefault();
//     addColor(formData);
//     // imperatively redirect to homepage
//     history.push('/');
//   }

//   return (
//     <form action="" onSubmit={handleSubmit}>
//       <label htmlFor="colorName">Color Name:</label>
//       <input
//         name="colorName"
//         onChange={handleChange}
//         value={formData.colorName}
//       />
//       <label htmlFor="color">Color:</label>
//       <input
//         name="color"
//         type="color"
//         onChange={handleChange}
//         value={formData.color}
//       />
//       <button>Submit</button>
//     </form>
//   );
// }

// export default AddColorForm;
