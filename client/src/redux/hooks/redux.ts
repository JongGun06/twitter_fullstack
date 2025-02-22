import { TypedUseSelectorHook, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { useSelector } from "react-redux";


export let useAppDispatch = useDispatch<AppDispatch>()
export let useAppSelector:TypedUseSelectorHook<RootState> = useSelector