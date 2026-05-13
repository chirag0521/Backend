import { createContext, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const SongContext = createContext()

export const SongContextProvider = ({ children }) => {

    const [song, setSong] = useState({

        "url": "https://ik.imagekit.io/alex2105/Moodify/songs/Main_Phir_Bhi_Tumko_Chahunga__Arijit_Sing_-_GanaMp3.Co__Eij8P09g8.mp3",
        "posterUrl": "https://ik.imagekit.io/alex2105/Moodify/posters/Main_Phir_Bhi_Tumko_Chahunga__Arijit_Sing_-_GanaMp3.Co__5tKgivBsf.jpeg",
        "title": "Main Phir Bhi Tumko Chahunga (Arijit Sing)-(GanaMp3.Co)",
        "mood": "sad",

    })

    const [loading, setLoading] = useState(false)

    return (
        <SongContext.Provider value={{ loading, setLoading, song, setSong }}>
            {children}
        </SongContext.Provider>
    )
}