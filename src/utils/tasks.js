import * as State from '../constants/taskStates'

export const getTaskStateString = idState => {
    switch (idState) {
        case State.TASK_STATE_OPEN: return 'Abierta'
        case State.TASK_STATE_DOING: return 'En proceso'
        case State.TASK_STATE_DONE: return 'Completada'
        case State.TASK_STATE_CANCELLED: return 'Cancelada'
        default: return 'Abierta'
    }
}