import { Outlet } from 'react-router-dom';
import TopNav from '../../components/header/StudHeader';

const StudHome = () => {
    return (
        <div>
            <TopNav />
            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default StudHome;