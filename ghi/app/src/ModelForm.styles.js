export const formContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '40px',
  padding: '2rem',
  borderRadius: '15px',
  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
  background: 'linear-gradient(to bottom, #8B0000, #333333)',
  color: '#fff', // White text for better contrast
  width: '100%',
  maxWidth: '500px',
  margin: 'auto',
};

export const formTitleStyle = {
  fontWeight: 'bold',
  textAlign: 'center',
  fontSize: '2rem',
  marginBottom: '1.5rem',
  color: 'white', // vibrant color for titles, reminiscent of racing stripes
};

export const formGroupStyle = {
  marginBottom: '1rem',
  width: '100%',
};

export const labelStyle = {
  display: 'block',
  marginBottom: '.5rem',
  fontWeight: 'bold',
  color: 'white', // matching the form title
};

export const inputStyle = {
  border: '2px solid #34495e',
  borderRadius: '4px',
  padding: '10px',
  width: '100%',
  marginBottom: '1rem',
  backgroundColor: '#ecf0f1',
  color: '#2c3e50'
};

export const buttonStyle = {
  backgroundColor: 'black', // button color inspired by racing red
  color: 'white',
  border: 'none',
  padding: '10px 15px',
  cursor: 'pointer',
  borderRadius: '5px',
  fontWeight: 'bold',
  fontSize: '1rem',
  transition: 'background-color 0.3s',
  width: '100%',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
};

export const selectStyle = {
  ...inputStyle, // Inherits all styles from inputStyle
  appearance: 'none',
  backgroundImage: 'url("data:image/svg+xml;utf8,<svg fill=\'%232c3e50\' height=\'24\' viewBox=\'0 0 24 24\' width=\'24\' xmlns=\'http://www.w3.org/2000/svg\'><path d=\'M0 0h24v24H0z\' fill=\'none\'/><path d=\'M7 10l5 5 5-5z\'/></svg>")',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right .7em top 50%',
  backgroundSize: '1.5em',
};

export const buttonHoverStyle = {
  ':hover': {
      backgroundColor: '#c0392b', // a darker shade when hovered
  }
};

export const inputFocusStyle = {
  ':focus': {
      borderColor: '#3498db', // color change on focus
      outline: 'none'
  }
};

export const imagePreviewStyle = {
  maxWidth: '100%', // This ensures the image is not wider than its container
  maxHeight: '300px', // Adjust the value as needed
  objectFit: 'contain', // This ensures the aspect ratio is maintained
  margin: '0 auto', // This centers the image if it's smaller than the max width
  display: 'block' // This ensures the image doesn't inline with other elements
};

export const imagePreviewContainerStyle = {
  textAlign: 'center', // Center the image container
  maxWidth: '100%', // Ensures the container fits within its parent
  maxHeight: '300px', // Adjust the value as needed to fit your design
  overflow: 'hidden', // Prevents the image from exceeding the container bounds
  margin: '1rem 0' // Adds some space around the image
};