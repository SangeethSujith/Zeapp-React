// validationUtils.js

export const validateEmail = (value) => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!value) {
        return 'Email is required';
    }
    if (!emailRegex.test(value)) {
        return 'Invalid email format';
    }
    return '';
};

export const validatePassword = (value) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    if (!value) {
        return 'Password is required';
    }
    if (!passwordRegex.test(value)) {
        return 'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character';
    }
    return '';
};
