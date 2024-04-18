import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";

// Define selector to get form state

interface FormData {
  nickname: string;
  name: string;
  surname: string;
  sex: string;
  advantages: string[];
  checkbox: string[];
  radio: string;
  about: string;
}

interface InitialValues {
  number: string;
  email: string;
}

interface FormState {
  showSuccessModal: boolean;
  showFailureModal: boolean;
  storeData: FormData;
  initialValues: InitialValues;
}

const initialState: FormState = {
  showSuccessModal: false,
  showFailureModal: false,
  storeData: {
    nickname: "",
    name: "",
    surname: "",
    sex: "man",
    advantages: ["", "", ""],
    checkbox: [],
    radio: "",
    about: "",
  },
  initialValues: {
    number: "",
    email: "",
  },
};

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setShowSuccessModal: (state, action: PayloadAction<boolean>) => {
      state.showSuccessModal = action.payload;
    },
    setShowFailureModal: (state, action: PayloadAction<boolean>) => {
      state.showFailureModal = action.payload;
    },
    setStoreData: (state, action: PayloadAction<FormData>) => {
      state.storeData = action.payload;
    },
    setInitialValues: (state, action: PayloadAction<InitialValues>) => {
      state.initialValues = action.payload;
    },
  },
});

export const {
  setShowSuccessModal,
  setShowFailureModal,
  setStoreData,
  setInitialValues,
} = formSlice.actions;

export const selectForm = (state: { form: FormState }) => state.form;
export const selectCombinedFormData = createSelector(
  selectForm,
  formState => ({
    initialValues: formState.initialValues,
    storeData: formState.storeData
  })
);
export default formSlice.reducer;
