import create from 'zustand';
import { persist } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage';

const useStore = create(persist(
    (set) => ({
        darkMode: false,
        toggleDarkMode: () => set(state => ({ darkMode: !state.darkMode })),
    }),
    {
        name: "settings",
        getStorage: () => AsyncStorage,
    }
))


export default useStore;