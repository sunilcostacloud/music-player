import { DELETE_MUSIC_FAILURE, DELETE_MUSIC_REQUEST, DELETE_MUSIC_RESET, DELETE_MUSIC_SUCCESS, EDIT_MUSIC_FAILURE, EDIT_MUSIC_REQUEST, EDIT_MUSIC_RESET, EDIT_MUSIC_SUCCESS, GET_MUSIC_BY_ID_FAILURE, GET_MUSIC_BY_ID_REQUEST, GET_MUSIC_BY_ID_SUCCESS, GET_MUSIC_FAILURE, GET_MUSIC_REQUEST, GET_MUSIC_SUCCESS, UPLOAD_MUSIC_FAILURE, UPLOAD_MUSIC_REQUEST, UPLOAD_MUSIC_RESET, UPLOAD_MUSIC_SUCCESS } from "../actionTypes/musicTypes";

const initialState = {
    getMusic: {
        isLoading: false,
        isError: false,
        error: null,
        isSuccess: false,
        data: {}
    },
    uploadMusic: {
        isLoading: false,
        isError: false,
        error: null,
        isSuccess: false,
        data: {}
    },
    editMusic: {
        isLoading: false,
        isError: false,
        error: null,
        isSuccess: false,
        data: {}
    },
    singleMusic: {
        isLoading: false,
        isError: false,
        error: null,
        isSuccess: false,
        data: {}
    },
    deleteMusic: {
        isLoading: false,
        isError: false,
        error: null,
        isSuccess: false,
        data: {}
    }
}

export const musicReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_MUSIC_REQUEST:
            return {
                ...state,
                getMusic: {
                    isLoading: true,
                    isError: false,
                    error: null,
                    isSuccess: false,
                    data: {}
                }
            }
        case GET_MUSIC_SUCCESS:
            return {
                ...state,
                getMusic: {
                    ...state.getMusic,
                    isLoading: false,
                    isSuccess: true,
                    data: action.payload
                }
            }
        case GET_MUSIC_FAILURE:
            return {
                ...state,
                getMusic: {
                    ...state.getMusic,
                    isLoading: false,
                    isError: true,
                    error: action.payload,
                    data: {}
                }
            }

        case UPLOAD_MUSIC_REQUEST:
            return {
                ...state,
                uploadMusic: {
                    ...state.uploadMusic,
                    isLoading: true,
                }
            }

        case UPLOAD_MUSIC_SUCCESS:
            return {
                ...state,
                uploadMusic: {
                    ...state.uploadMusic,
                    isLoading: false,
                    isSuccess: true,
                    data: action.payload
                }
            }

        case UPLOAD_MUSIC_FAILURE:
            return {
                ...state,
                uploadMusic: {
                    ...state.uploadMusic,
                    isLoading: false,
                    isError: true,
                    error: action.payload,
                    data: {}
                }
            }
        case UPLOAD_MUSIC_RESET:
            return {
                ...state,
                uploadMusic: {
                    isLoading: false,
                    isError: false,
                    error: null,
                    isSuccess: false,
                    data: {}
                }
            }

        case EDIT_MUSIC_REQUEST:
            return {
                ...state,
                editMusic: {
                    ...state.editMusic,
                    isLoading: true,
                }
            }

        case EDIT_MUSIC_SUCCESS:
            return {
                ...state,
                editMusic: {
                    ...state.editMusic,
                    isLoading: false,
                    isSuccess: true,
                    data: action.payload
                }
            }

        case EDIT_MUSIC_FAILURE:
            return {
                ...state,
                editMusic: {
                    ...state.editMusic,
                    isLoading: false,
                    isError: true,
                    error: action.payload,
                    data: {}
                }
            }
        case EDIT_MUSIC_RESET:
            return {
                ...state,
                editMusic: {
                    isLoading: false,
                    isError: false,
                    error: null,
                    isSuccess: false,
                    data: {}
                }
            }
        
        case GET_MUSIC_BY_ID_REQUEST:
            return {
                ...state,
                singleMusic: {
                    isLoading: true,
                    isError: false,
                    error: null,
                    isSuccess: false,
                    data: {}
                }
            }
        case GET_MUSIC_BY_ID_SUCCESS:
            return {
                ...state,
                singleMusic: {
                    ...state.singleMusic,
                    isLoading: false,
                    isSuccess: true,
                    data: action.payload.music
                }
            }
        case GET_MUSIC_BY_ID_FAILURE:
            return {
                ...state,
                singleMusic: {
                    ...state.singleMusic,
                    isLoading: false,
                    isError: true,
                    error: action.payload,
                    data: {}
                }
            }
        
        case DELETE_MUSIC_REQUEST:
            return {
                ...state,
                deleteMusic: {
                    ...state.deleteMusic,
                    isLoading: true,
                }
            }

        case DELETE_MUSIC_SUCCESS:
            return {
                ...state,
                deleteMusic: {
                    ...state.deleteMusic,
                    isLoading: false,
                    isSuccess: true,
                    data: action.payload
                }
            }

        case DELETE_MUSIC_FAILURE:
            return {
                ...state,
                deleteMusic: {
                    ...state.deleteMusic,
                    isLoading: false,
                    isError: true,
                    error: action.payload,
                    data: {}
                }
            }
        case DELETE_MUSIC_RESET:
            return {
                ...state,
                deleteMusic: {
                    isLoading: false,
                    isError: false,
                    error: null,
                    isSuccess: false,
                    data: {}
                }
            }

        default:
            return state;
    }
}