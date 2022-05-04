

const defaultState = {
    userId: '',
    name: '',
    description: '',
    phone: '',
    email: '',
    instagram: '',
    telegram: '',
    whatsUp: '',
    facebook: '',
    image: ''
}

const SAVE_INFO = 'SAVE_INFO'

export const userInfoReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SAVE_INFO:
            return {
                ...state,
                userId: action.payload,
                name: action.payload,
                description: action.payload,
                phone: action.payload,
                email: action.payload ,
                instagram: action.payload,
                telegram: '',
                whatsUp: '',
                facebook: '',
                image: '',

            }
    }
}
