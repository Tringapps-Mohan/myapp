import { useEffect, useState } from "react";
import Card from "./Card";
export default function CardsContainer(props) {
    const [state, setState] = useState({ loaded: false, data: [] });
    const [currentFormRequest, setFormRequest] = useState({});
    const [loaded, setLoaded] = useState(false);
    const [formData ,setFormData] = useState({
        post:{
            
        },
        get:{

        },
        put:{

        },
        delete:{

        }
    });
    useEffect(() => {
        (function(){loadAllData()})();
    }, []);

    const loadAllData = () => {
        fetch("http://localhost:4000/products")
            .then(res => res.json())
            .then(res => {
                setState({
                    ...state, data: res.data
                });
            })
            .catch(e => console.log(e));
            setLoaded(true);
    }

    const handleSubmit = (event) => {
        setFormRequest(new FormData(event.currentTarget));
        console.log(new FormData(event.currentTarget));
        event.preventDefault();
        
    }

    const frameRequest = () => {
        let data = "";
        for (const [key, value] of (currentFormRequest).entries()) {
            data += `${key}=${value}&`;
        }
        return data;
    }

    const postProducts = (event) => {
        handleSubmit(event);
        setLoaded(false);
        fetch("http://localhost:4000/products/" + frameRequest(), {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(currentFormRequest)
        })
            .then(res => res.json())
            .then(res => {
                if (res.success) {
                    loadAllData();
                }
            })
            .catch(e => console.log(e));
    }

    const getProducts = (event) => {
        handleSubmit(event);
        setLoaded(false);
        fetch("http://localhost:4000/products?" + frameRequest())
            .then(res => res.json())
            .then(res => {
                setState({ ...state, data: res.data });
                setLoaded(true);
            })
            .catch(e => {
                console.log(e);
            });
    }

    const deleteProducts = (event) => {
        handleSubmit(event);
        setLoaded(false);
        fetch("http://localhost:4000/products/deleteProduct/"+currentFormRequest.id,{
            method:"DELETE"
        })
        .then(res=>res.json())
        .then(res=>{
            if(res.success){
                loadAllData();
            }
        })
        .catch(e=>{
            console.log(e);
        })
    }

    const updateProducts = (event) => {
        handleSubmit(event);
        setLoaded(false);
        fetch("https://localhost:4000/update/"+currentFormRequest.id,{
            method:"PUT",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify(currentFormRequest)
        })
        .then(res=>res.json())
        .then(res=>{
            if(res.success)
                loadAllData();
        })
        .catch(e=>{
            console.log(e);
        })
    }

    return (
        <>
            <div>
                <h2>GET FORM</h2>
                <form onSubmit={getProducts}>
                    <div>
                        Limit :<input name="limit" type="range" min="1" max={state.data.length} />
                    </div>
                    <div>
                        Search Product :<input name="searchProduct" type="search" />
                    </div>
                    <div>
                        <input type="submit" value="submit" />
                    </div>
                </form>
            </div>
            <div>
                <h2>POST FORM</h2>
                <form onSubmit={postProducts}>
                    <div>
                        Post a Product<input name="productName" />
                    </div>
                    <div>
                        Content : <textarea name="content"></textarea>
                    </div>
                    <div>
                        <input type="submit" value="submit" />
                    </div>
                </form>
            </div>
            <div>
                <h2>DELETE FORM</h2>
                <form onSubmit={deleteProducts}>
                    <div>
                        Product name : <input name="id" />
                    </div>
                    <div>
                        <input type="submit" value="submit" />
                    </div>
                </form>
            </div>
            <div>
                <h2>PUT FORM</h2>
                <form onSubmit={updateProducts}>
                    <div>
                        Product name : <input name="searchProduct" type="search" />
                    </div>
                    <div>
                        New Value :<textarea name="productName" ></textarea>
                    </div>
                    <div>
                        <input type="submit" value="submit" />
                    </div>
                </form>
            </div>
            <section className="cards-container">
                {loaded ? (

                    state.data.map(product => <Card key={product.id} data={product} />)
                ) :
                    ("wait")}
            </section>
        </>
    )
}