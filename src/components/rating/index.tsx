import styles from './style.module.css'
import {useGetUserRateQuery, useRateUserMutation} from "../../store/api/rate";
import {useAppSelector} from "@hooks/redux.ts";
import {getUser} from "../../store/reducers/User/selectors/selector.ts";
const stars = Array.from({ length: 5 }, (_, index) => index+1);

interface Props{
    rating: number,
    owner_id: number
}

export const RatingStars = ({rating,owner_id}:Props) =>{
    const user = useAppSelector(getUser)
    const {data} = useGetUserRateQuery({owner:owner_id,user:user?.id});
    const [rateUser] = useRateUserMutation()

    const onRate = (rate:number) => () =>{
       rateUser({rate,owner:owner_id,user:user?.id})
    }

    console.log(data)

    return (
        <div className={styles.stars} style={{width: 140}}>
            {stars.map((star) => (
                <i key={star} className={`fa fa-star ${data && star <= data && styles.active}`} onClick={onRate(star)}></i>
            ))}
            <span>{rating ? rating.toFixed(1): 0}</span>
        </div>
    )
}
