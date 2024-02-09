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
  color: '#fff',
  width: '100%',
  maxWidth: '500px',
  margin: 'auto',
};

export const formTitleStyle = {
  fontWeight: 'bold',
  textAlign: 'center',
  fontSize: '2rem',
  marginBottom: '1.5rem',
  color: 'white',
};

export const formGroupStyle = {
  marginBottom: '1rem',
  width: '100%',
};

export const labelStyle = {
  display: 'block',
  marginBottom: '.5rem',
  fontWeight: 'bold',
  color: 'white',
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
  backgroundColor: 'black',
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
  ...inputStyle,
  appearance: 'none',
  backgroundImage: 'url("data:image/svg+xml;utf8,<svg fill=\'%232c3e50\' height=\'24\' viewBox=\'0 0 24 24\' width=\'24\' xmlns=\'http://www.w3.org/2000/svg\'><path d=\'M0 0h24v24H0z\' fill=\'none\'/><path d=\'M7 10l5 5 5-5z\'/></svg>")',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right .7em top 50%',
  backgroundSize: '1.5em',
};

export const buttonHoverStyle = {
  ':hover': {
      backgroundColor: '#c0392b',
  }
};

export const inputFocusStyle = {
  ':focus': {
      borderColor: '#3498db',
      outline: 'none'
  }
};

export const imagePreviewStyle = {
  maxWidth: '100%',
  maxHeight: '300px',
  objectFit: 'contain',
  margin: '0 auto',
  display: 'block'
};

export const imagePreviewContainerStyle = {
  textAlign: 'center',
  maxWidth: '100%',
  maxHeight: '300px',
  overflow: 'hidden',
  margin: '1rem 0'
};
