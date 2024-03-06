import { useContext } from "react";
import { ApiContext } from "../../api";

interface Props {
    children: React.ReactNode;
}

export function LoggedIn({ children } : Props ) {
    const api = useContext(ApiContext);

    if (api.currentUser) {
        return children;
    } else {
        return null;
    }
}

export function Guest({ children } : Props ) {
    const api = useContext(ApiContext);

    if (api.currentUser) {
        return null;
    } else {
        return children;
    }
}

interface NeedsRoleProps {
    children: React.ReactNode;
    role: string;
}

export function NeedsRole({ children, role }: NeedsRoleProps) {
    const api = useContext(ApiContext);

    if (api.currentUser?.role === role) {
        return children;
    } else {
        return null;
    }
}
