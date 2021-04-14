import React, { Component } from 'react'
import RestaurantsController from '../contollers/RestaurantsController'
import { connect } from 'react-redux'
import { fetchRestaurants } from '../store/actions'
import { Link } from 'react-router-dom'
import Button from './Button'
class RestaurantCard extends Component {
    constructor(props) {
        super(props)
    }
    async componentDidMount() {
        let restaurants = await RestaurantsController.get();
        this.props.fetchRestaurants(restaurants);




    }
    render() {
        let restaurants = this.props.restaurants.map((restaurant) => {
            return (
                <div key={restaurant.id} className="lg:w-1/4 md:w-1/2 p-4 w-full transform transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-110">
                    <a className="block relative h-48 rounded overflow-hidden">
                        <img alt="Restaurant" className="object-cover object-center w-4/5 h-4/5 block " src={restaurant.logo_url} />
                    </a>
                    <div className="mt-2">
                        <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{restaurant.name}</h3>
                        
                        <Link to={'Menu/'+restaurant.id}>
                            <Button type="Dark" text="Order Now"/>
                        </Link>

                    </div>
                </div>
            )
        });
        return (

            <div className="flex flex-wrap -m-2 ">{restaurants}</div>


        )
    }
}

const mapStateToProps = ({ restaurants }) => {
    return { restaurants }
}
const mapActionsToProps = { fetchRestaurants };

export default connect(mapStateToProps, mapActionsToProps)(RestaurantCard);
