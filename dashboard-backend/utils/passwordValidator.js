export const validatePassword = (password) => {
  if (!password) {
    return {
      isValid: false,
      errors: ['Password is required']
    }
  }

  if (password.length < 8) {
    return {
      isValid: false,
      errors: ['Password must be at least 8 characters']
    }
  }

  return {
    isValid: true,
    errors: []
  }
}
