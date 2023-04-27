import useFoodItems from "../hooks/useFoodItems";

const FoodItemsRedux = () => {
    const { items, dispatch, actions: { add, removeFirst, removeLast, reset } } = useFoodItems()

    return (
        <section className="objComp">
            <h3>Objects</h3>
            <div className="items">
                {
                    items.map((ele, index) => {
                        return (
                            <div className={'item'} key={index}>
                                <p>ID :- {ele.id}</p>
                                <p>Item :- {ele.item}</p>
                            </div>
                        )
                    })
                }
            </div>
            <div className="ctas">
                <button onClick={() => dispatch(add())}>add</button>
                <button onClick={() => dispatch(removeFirst())}>remove first item</button>
                <button onClick={() => dispatch(removeLast())}>remove last item</button>
                <button onClick={() => dispatch(reset())}>reset</button>
            </div>
        </section>
    )
}

export default FoodItemsRedux