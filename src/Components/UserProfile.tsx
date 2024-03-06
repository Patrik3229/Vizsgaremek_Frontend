import { User } from "../User";
import { NeedsRole } from "./auth";

interface Props {
    user: User;
}

export function UserProfile({ user }: Props) {
    //const { user } = props;
    return <div>
        <h2>Email: { user.email }</h2>
        <p>{ user.introduction }</p>
        <p style={{fontStyle: 'italic'}}>Role: { user.role }</p>
        
        <NeedsRole role="admin">
            <button>Törlés</button>
        </NeedsRole>
    </div>
}
