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

    interface Ratings {
        id: number;
        rating: number;
        content: string;
        user_id: number;
        userName?: string;
    }

    useEffect(() => {
        async function fetchRatings() {
            try {
                const response = await fetch(`http://localhost:3000/ratings/find-recipe/${id}`)
                const data = await response.json();

                if (!response.ok) throw new Error('Failed to fetch ratings');

                const userRequests = data.map(async (rating) => {
                    const userResponse = await fetch(`http://localhost:3000/users/find${rating.user_id}`);
                    const userData = await userResponse.json();
                    if (!userResponse.ok) throw new Error('Failed to fetch user');

                    return { ...rating, userName: userData.name }; // Append the user name to the rating object
                });

                const ratingsWithUsers = await Promise.all(userRequests);
                setRatings(ratingsWithUsers);
            }
            catch (e) {
                console.error(e);
                return;
            }
        }

        fetchRatings()
    }, [id])

    useEffect(() => {
        console.log('Updated Ratings:', ratings);
    }, [ratings]);

    return <>
        <div id="ratings">
            {ratings.map(rating => (
                <div key={rating.id}>
                    <div className="spbw">
                        <div>{rating.userName || 'Unknown'}</div>
                        <div><span className="fa fa-solid fa-star"></span>&nbsp;{rating.rating} / 5</div>
                    </div>
                    <div style={{borderBottom:'1px solid grey', marginBottom:'20px'}}>
                        <div style={{borderLeft:'3px solid grey', margin:'10px 10px 20px 0px', padding:'5px 10px 5px 10px', marginBottom:'10px'}}>{rating.content}</div>
                    </div>
                </div>
                
            ))}
        </div>
    </>
}