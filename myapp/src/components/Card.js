import "./Card.css";
export default function Card(props){
    const {data} = props;
    return (
        <div className="card-container">
            <div className="card-title">
                {data.title}
            </div>
            <div className="card-image-container">
                <img src={data.image} className="card-image" alt={data.title}/>
            </div>
            <div className="card-desc">
                <p>
                    {data.description}
                </p>
            </div>
            <div className="card-tags-container">
                <div className="card-tags">
                    {data.category}
                </div>
                <div className="card-tags card-tags-rate">
                    Rating : {data.rating.rate}
                </div>
                <div className="card-tags">
                    Stock : {data.rating.count}
                </div>
            </div>
            <div className="card-price">
                {data.price}
            </div>
            <div className="card-actions">
                <div className="card-actions-button">Buy</div>
            </div>
        </div>
    )
}