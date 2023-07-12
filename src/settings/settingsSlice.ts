import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { getSettingsFor } from "../services/settings";

interface InitialState {
  settings: {},
  status: string,
  error: string,
  sideMenu: boolean
}

const initialState: InitialState = {
  settings: {},
  status: 'idle',
  error: '',
  sideMenu: false
}

export const getSettings = createAsyncThunk(
  'settings/getSettings',
  async (id : string) => {
    const response = await getSettingsFor(id);
    return response;
  }
)

const settingsSlice = createSlice({
  name: 'settings',
  initialState: initialState,
  reducers: {
    toggleSideMenu(state: InitialState) {
      state.sideMenu = !state.sideMenu;
      return state;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getSettings.fulfilled, 
        (state, action) => {
          state.status = 'succeed'
          if (!!action.payload) {
            state.settings = action.payload
          } else {
            state.error = 'Error trying to load information'
          }
      }
    )
  }
})

export const { toggleSideMenu } = settingsSlice.actions;
export default settingsSlice.reducer;

export const getSideMenuState = (state: RootState) => {
  return state.settings.sideMenu;
}

export const getSettingsInformation = (state: RootState) => {
  return state.settings.settings;
}

export const getSettingsStatus = (state: RootState) => {
  return state.settings.status;
}