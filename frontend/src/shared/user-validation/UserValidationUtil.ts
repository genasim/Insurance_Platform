interface CreateUserDto {
    email: string | undefined,
    password: string | undefined,
    passwordConfirm: string | undefined,
    fullName: string | undefined,
    idNumber: string | undefined,
}

const validateUser = (state: CreateUserDto) => {
    let isValid = true;
    const emailErrors: string[] = [];
    if (!state.email || !state.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
        emailErrors.push("Invalid email address");
        isValid = false;
    }

    const passwordErrors: string[] = [];

    if (state.password !== state.passwordConfirm) {
        passwordErrors.push("Passwords do not match");
        isValid = false;
    }

    if (!state.password || state.password.length < 8) {
        passwordErrors.push("Password must be at least 8 characters");
        isValid = false;
    }

    if (!!state.password && !state.password.match(/\d+/g)) {
        passwordErrors.push("Password must contain a number");
        isValid = false;
    }

    if (!!state.password && state.password === state.password.toUpperCase()) {
        passwordErrors.push("The password must contain a lower case character");
        isValid = false;
    }

    if (!!state.password && state.password === state.password.toLowerCase()) {
        passwordErrors.push("The password must contain an upper case character");
        isValid = false;
    }

    if (!!state.password && !state.password.match(/[!@#$%^&]/g)) {
        passwordErrors.push("Password must contain !, @, #, $, %, ^ or &");
        isValid = false;
    }

    const fullNameErrors: string[] = [];
    if (!state.fullName) {
        fullNameErrors.push("Full name must not be empty");
        isValid = false;
    }

    const idNumberErrors: string[] = [];
    if (!state.idNumber || state.idNumber.length !== 10) {
        idNumberErrors.push("Id number must be 10 symbols");
        isValid = false;
    }

    if (!!state.idNumber && !state.idNumber.match(/\d{10}/g)) {
        idNumberErrors.push("Id number must be only digits");
        isValid = false;
    }

    return {isValid, emailErrors, passwordErrors, fullNameErrors, idNumberErrors};
}

export {validateUser};