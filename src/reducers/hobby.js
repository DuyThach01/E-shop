const initialState = {
  list: [],
  activeId: null,
};
const hobbyReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_HOBBY": {
      const newList = [];
      newList.push(action.payload);
      localStorage.setItem("cartt", JSON.stringify(newList));
      return {
        ...state,
        list: newList,
      };
    }
    default:
      return state;
  }
};
export default hobbyReducer;
