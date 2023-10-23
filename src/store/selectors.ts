import type { RootStore } from ".";
import { DataStore } from "./slice";


export const getData = (store: RootStore): DataStore["data"] => store.reducer.data;

export const getTeachers = (store: RootStore): DataStore["teachers"] => store.reducer.teachers;
