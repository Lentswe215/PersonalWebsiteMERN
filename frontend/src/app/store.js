import {
  configureStore
} from '@reduxjs/toolkit';
import authReducer from "../features/auth/authSlice";
import PageReducer from "../features/pageContents/PageSlice";
import MessageReducer from "../features/contactMessages/MessageSlice";
import ProjectReducer from "../features/Projects/ProjectSlice";
import SkillReducer from "../features/Skills/SkillSlice"
export const store = configureStore({
  reducer: {
    auth: authReducer,
    pages: PageReducer,
    messages: MessageReducer,
    projects: ProjectReducer,
    skills: SkillReducer
  },
});