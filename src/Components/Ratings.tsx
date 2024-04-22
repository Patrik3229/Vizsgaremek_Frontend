import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import '../css/Ratings.scoped.css'

/**
 * Komponens, ami lekéri és visszaadja egy adott recept értékeléseit.
 * @componenet
 * @returns Az adott recept értékeléseit.
 */
export function Ratings() {

    const [ratings, setRatings] = useState<Ratings[]>([]);
    const { id } = useParams<{ id: string }>();
    const [ratingsExist, setRatingsExist] = useState(false);

    interface Ratings {
        id: number;
        rating: number;
        content: string;
        user_id: number;
        userName?: string;
    }

    useEffect(() => {

        /**
         * Lekéri az értékeléseket és a hozzájuk tartozó felhasználó nevét.
         */
        async function fetchRatings() {
            try {
                const response = await fetch(`http://localhost:3000/ratings/find-recipe/${id}`)
                const data = await response.json();

                if (!response.ok) throw new Error('Failed to fetch ratings');

                const userRequests = data.map(async (rating: Ratings) => {
                    const userResponse = await fetch(`http://localhost:3000/users/find${rating.user_id}`);
                    const userData = await userResponse.json();
                    if (!userResponse.ok) throw new Error('Failed to fetch user');

                    return { ...rating, userName: userData.name };
                });

                const ratingsWithUsers = await Promise.all(userRequests);
                setRatings(ratingsWithUsers);
            }
            catch (e) {
                console.error(e);
                return;
            }
        }

        fetchRatings();

        

    }, [id])

    useEffect(() => {
        if(ratings.length != 0) {
            setRatingsExist(true);
            console.log(ratingsExist);
        }
    }, [ratings])

    return <>
        {console.log(ratings.length)}
        {console.log(ratingsExist)}
        {ratingsExist == true ? (<><h3 style={{ marginBottom: '30px' }}>Reviews</h3></>) : ('')}
        
        <div id="ratings">
            {ratings.map(rating => (
                <div key={rating.id}>
                    <div className="spbw">
                        <div>{rating.userName || 'Unknown'}</div>
                        <div><span className="fa fa-solid fa-star"></span>&nbsp;{rating.rating} / 5</div>
                    </div>
                    <div id="contentOuter">
                        <div id="content">{rating.content}</div>
                    </div>
                </div>
                
            ))}
        </div>
    </>
}