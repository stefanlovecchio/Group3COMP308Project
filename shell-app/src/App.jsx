import React, { useEffect, Suspense } from 'react';

const AuthMicroFrontend = React.lazy(() => import('authMicroFrontend/App'));

const App = () => {
    
    return (
        <div>
            <h1>Shell App</h1>
            <Suspense fallback={<div>Loading Auth Micro-Frontend...</div>}>
                <AuthMicroFrontend />
            </Suspense>
            
        </div>
    );
};

export default App;
