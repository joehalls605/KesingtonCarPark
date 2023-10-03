import { createContext, useState, useEffect} from "react"

const NavigationContext = createContext();

const NavigationProvider = ({children}) => {
    const [currentPath, setCurrentPath] = useState(window.location.pathname);

    useEffect(()=>{ // handles user clicking forward and back. Updates the path.
        const handler = () => {
            setCurrentPath(window.location.pathname)
        }
        window.addEventListener('popstate', handler);

        return () => {
            window.removeEventListener('popstate', handler)
        }
    }, [])


    // Important, lets us navigate around the application.
    const navigate = (to) =>{
        window.history.pushState({}, '', to);
        setCurrentPath(to);
    };

    return(
        <NavigationContext.Provider value={{currentPath, navigate}}>
            {/* <div>
            <button onClick={() => navigate('/accordion')}>go to accordion</button>
            </div> */}
            {/* {currentPath} */}
            {children}
        </NavigationContext.Provider>
    )
}

export {NavigationProvider};
export default NavigationContext;