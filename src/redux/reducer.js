import * as actionTypes from './actions'

const initialState = {
    myAnswer: null,
    score: 0,
    answer: ''
};

const reducer = (state = initialState, action) =>{
    switch(action.type){
        case actionTypes.NEXT_QUESTION:
            return{

            }
        default: 
            return state
    }
};

export default reducer