
const productError = (product) => {
    return `Una o mas propiedades estan incompletas o no son válidas.
    Propiedades requeridas:
    * title: se espera un string, se recibió ${product.title}
    * description: se espera un string, se recibió ${product.description}
    * price: se espera un number, se recibió ${product.price}
    * code: se espera un string, se recibió ${product.code}
    * stock: se espera un number, se recibió ${product.stock}
    * category; se espera un string, se recibió ${product.category}`
}

const userError = (user) => {
    return `Una o mas propiedades estan incompletas o no son válidas.
    Propiedades requeridas:
    * first_name: se espera un string, se recibió ${user.first_name}
    * last_name: se espera un string, se recibió ${user.last_name}
    * age: se espera un string, se recibió ${user.age}
    * email: se espera un string, se recibió ${user.email}
    * password: se espera un string, se recibió ${user.password}`
}

const emailError = (email) => {
    return `El formato del mail no es correcto.
    Ejemplos de formato: 
    * se espera email@example.com o email@example.com.ar, se recibió ${email}`
}

const userNotFoundError = (user) => {
    return `El usuario buscado no existe.
    * se espera un user Object, se recibió ${user}`
}

const passwordError = (password) => {
    return `El password ingresado  ${password} no es correcto `
}

const userExistsError = (user) => {
    return `Ya existe un usuario registrado bajo el email ${user.email}. Ingrese otro`
}

const loginError = (data) => {
    return `Una o mas propiedades estan incompletas o no son válidas.
    Propiedades requeridas:
    * email: se espera un string, se recibió ${data.email}
    * password: se espera un string, se recibió ${data.password}`
}

const resetError = (data) => {
    return `Una o mas propiedades estan incompletas o no son válidas.
    Propiedades requeridas:
    * email: se espera un string, se recibió ${data.email}
    * password: se espera un string, se recibió ${data.password}`
}

const roleError = (user, policies) => {
    return `El usuario posee rol ${user.role}, pero se necesita rol ${policies.toString()} para acceder al endpoint`
}



export {
    productError,
    userError,
    emailError,
    userNotFoundError,
    passwordError,
    userExistsError,
    loginError,
    resetError,
    roleError
}   