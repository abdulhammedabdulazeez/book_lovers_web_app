import { createContext, ReactNode, useReducer } from "react";

interface BookContextState {
    selectedFilters: string[];
}

interface BookContextProps extends BookContextState {
    handleAddFilter: (filter: string) => void,
    handleRemoveFilter: (filter: string) => void,
}

const initialState: BookContextState = {
    selectedFilters: []
};

type Action = 
    | { type: "ADD_FILTER"; payload: { filter: string } }
    | { type: "REMOVE_FILTER"; payload: { filter: string } };

const bookReducer = (state: BookContextState, action: Action) => {
    switch (action.type) {
        case "ADD_FILTER":
            return {
                ...state,
                selectedFilters: [...state.selectedFilters, action.payload.filter]
            }
        case "REMOVE_FILTER":
            return {
            ...state,
            selectedFilters: state.selectedFilters.filter(f => f !== action.payload.filter)
            };
        default:
            return state;
    }
}

const BookContext = createContext<BookContextProps>({
    ...initialState,
    handleAddFilter: () => { },
    handleRemoveFilter: () => { },
});

const BookContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(bookReducer, initialState);

    const handleAddFilter = (filter: string) => {
        dispatch({ type: "ADD_FILTER", payload: { filter } });
    };

    const handleRemoveFilter = (filter: string) => {
        dispatch({ type: "REMOVE_FILTER", payload: { filter } });
    };

    const ctxValue = {
        ...state,
        handleAddFilter,
        handleRemoveFilter
    }

    return (
        <BookContext.Provider value={ctxValue}>
            {children}
        </BookContext.Provider>
    );
};

export { BookContext, BookContextProvider };