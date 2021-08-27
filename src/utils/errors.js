import * as Error from '../constants/errors';

export const getErrorType = (errorCode) => {
    switch (errorCode) {
        case 401: return Error.UNAUTHORIZED_ACCESS;
        case 404: return Error.NOT_FOUND;
        case 1000: return Error.UNKNOWN_ERROR;
        case 1100: return Error.EMAIL_DOES_NOT_EXIST;
        case 1101: return Error.PASSWORD_IS_NOT_CORRECT;
        case 1102: return Error.LOGIN_HAS_FAILED;
        case 1150: return Error.PASSWORDS_DOES_NOT_MATCH;
        case 1151: return Error.SIGNUP_HAS_FAILED;
        case 1200: return Error.USER_DOES_NOT_EXIST;
        case 1201: return Error.GET_USER_DATA_HAS_FAILED;
        case 1202: return Error.USERNAME_ALREADY_EXIST;
        case 1203: return Error.EMAIL_ALREADY_EXIST;
        case 1204: return Error.GITLAB_TOKEN_IS_NOT_CORRECT;
        case 1205: return Error.GITHUB_TOKEN_IS_NOT_CORRECT;
        case 1250: return Error.CREATE_PROJECT_HAS_FAILED;
        case 1251: return Error.DUE_DATE_IS_NOT_CORRECT;
        default: return Error.UNKNOWN_ERROR;
    }
}

export const getMessageError = errorCode => {
    //let errorType = getErrorType(errorCode);
    switch (errorCode) {
        case Error.UNAUTHORIZED_ACCESS: return 'Acceso denegado.';
        case Error.NOT_FOUND: return 'Error 404.';
        case Error.UNKNOWN_ERROR: return 'Error desconocido.';
        case Error.EMAIL_DOES_NOT_EXIST: return 'El correo electrónico no existe.';
        case Error.PASSWORD_IS_NOT_CORRECT: return 'La constraseña no es correcta.';
        case Error.PASSWORDS_DOES_NOT_MATCH: return 'Las contraseñas no coinciden.';
        case Error.LOGIN_HAS_FAILED: return 'Error al iniciar sesión.';
        case Error.SIGNUP_HAS_FAILED: return 'Error al crear la cuenta.';
        case Error.EMAIL_ALREADY_EXIST: return 'El correo electrónico ya existe.';
        case Error.USER_DOES_NOT_EXIST: return 'El usuario no existe.';
        case Error.GET_USER_DATA_HAS_FAILED: return 'Error al obtener los datos.';
        case Error.USERNAME_ALREADY_EXIST: return 'El nombre de usuario ya existe.';
        case Error.GITHUB_TOKEN_IS_NOT_CORRECT: return 'El token de GitHub es incorrecto.';
        case Error.GITLAB_TOKEN_IS_NOT_CORRECT: return 'El token de GitLab es incorrecto.';
        case Error.CREATE_PROJECT_HAS_FAILED: return 'El proyecto no pudo ser creado.';
        case Error.DUE_DATE_IS_NOT_CORRECT: return 'La fecha de entrega debe ser mayor a la de inicio.';
        case Error.USER_ALREADY_EXIST: return 'El usuario ya está en el equipo.'
        case Error.CANT_UPDATE_DEFAULT_LEVEL: return 'No se pudo modificar un rol.'
        case Error.CREATE_TASK_HAS_FAILED: return 'No se pudo crear la tarea.'
        case Error.USER_DOES_NOT_HAVE_PERMISSION: return 'No cuentas con permiso para realizar esta operación.'
        default : return 'Error desconocido.';
    }    
}