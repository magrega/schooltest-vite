import { useSelector, useStore } from "react-redux";
import { AppStore, RootState } from "../state/store";

export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();
