import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    selectedCategories: [],
    selectedTags: [],
    selectedWebsite: {},
    search: "",
    user: { id: 0, username: "", password: "", role: "", enabled: false }
};

export const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        addSelectedCategory: (state, action) => { state.selectedCategories = [...state.selectedCategories, action.payload] },
        removeSelectedCategory: (state, action) => { state.selectedCategories = state.selectedCategories.filter(category => category !== action.payload) },
        addSelectedTag: (state, action) => { state.selectedTags = [...state.selectedTags, action.payload] },
        removeSelectedTag: (state, action) => { state.selectedTags = state.selectedTags.filter(tag => tag !== action.payload) },
        setSelectedWebsite: (state, action) => { state.selectedWebsite = action.payload },
        setSearch: (state, action) => { state.search = action.payload },
        setUser: (state, action) => { state.user = action.payload }

    }
})

export const {
    addSelectedCategory,
    removeSelectedCategory,
    addSelectedTag,
    removeSelectedTag,
    setSelectedWebsite,
    setSearch,
    setUser
} = uiSlice.actions
