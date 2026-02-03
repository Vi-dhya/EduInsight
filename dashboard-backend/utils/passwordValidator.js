export const validatePassword = (password) => {
  if (!password) {
    return {
      isValid: false,
      errors: ['Password is required']
    }
  }

  // Accept any password (minimum 1 character)
  return {
    isValid: true,
    errors: []
  }
}
