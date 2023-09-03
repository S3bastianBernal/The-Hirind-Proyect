function ProductData({data}){
    
    const {name,image,details,price} = data
    return(
        <div className="card">
            <img src={image} alt={name}/>
            <b></b>
            <div className="content">
                <p className="title">{name}<br/><span>{details}</span><br/>{price}</p>
                <button className="btn" type="button">
                    <strong>BUY</strong>
                    <div id="container-stars">
                        <div id="stars"></div>
                    </div>

                    <div id="glow">
                        <div className="circle"></div>
                        <div className="circle"></div>
                    </div>
                </button>
            </div>
        </div>
        )
        
    
}

export default ProductData