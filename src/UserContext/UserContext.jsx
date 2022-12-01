import React, { createContext, useEffect, useState } from 'react'
export const AuthContext = createContext();
function UserContext({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [refetch, setRefetch] = useState(false)
    const postinfo = { user, setUser, loading, setLoading, refetch, setRefetch };

    useEffect(() => {
        setLoading(true)
        const isUser = localStorage.getItem('task-token');
        if (isUser) {
            setUser(true)
            setLoading(false)
        }
    }, [loading])

    return (
        <AuthContext.Provider value={postinfo}>
            {children}
        </AuthContext.Provider>
    )
}

export default UserContext;