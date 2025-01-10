export function validation(formData, setErrors) {
  let formErrors = {};
  let isValid = true;

  // Trim all inputs to avoid issues with leading/trailing spaces
  const trimmedData = {
    fullname: formData.fullname?.trim(),
    email: formData.email?.trim(),
    postalcode: formData.postalcode?.trim(),
    city: formData.city?.trim(),
  };

  // Validate Full Name (required)
  if (!trimmedData.fullname) {
    formErrors.fullname = "Full Name is required.";
    isValid = false;
  }

  // Validate Email (required and must be a valid email)
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (!trimmedData.email) {
    formErrors.email = "Email is required.";
    isValid = false;
  } else if (!emailRegex.test(trimmedData.email)) {
    formErrors.email = "Please enter a valid email address.";
    isValid = false;
  }

  // Validate Postal Code (required and should allow alphanumeric for global use)
  const postalCodeRegex = /^[0-9a-zA-Z ]+$/; // Adjusted to allow alphanumeric
  if (!trimmedData.postalcode) {
    formErrors.postalcode = "Postal Code is required.";
    isValid = false;
  } else if (!postalCodeRegex.test(trimmedData.postalcode)) {
    formErrors.postalcode = "Postal Code must be alphanumeric.";
    isValid = false;
  }

  // Validate City (required)
  if (!trimmedData.city) {
    formErrors.city = "City is required.";
    isValid = false;
  }

  setErrors(formErrors);
  return isValid;
}
