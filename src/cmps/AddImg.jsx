import React, { Component } from 'react'

import {cloudinaryService} from '../services/cloudinaryService'

export class AddImg extends Component {

    onSelectImg = (imgUrl) => {
        if(this.props.card){this.props.card.imgUrl = imgUrl
            this.props.updateState('isAddImgModalShown', false)
            return this.props.card}
            else{
                this.props.onAddimg(imgUrl)

            }
        
    }
    onAddImg = async (ev) => {
        const imgUrl = await cloudinaryService.uploadImg(ev)
        this.onSelectImg(imgUrl)
      }

    render() {
        const imgUrls = [
            'https://res.cloudinary.com/cloudinary-img/image/upload/v1600352682/Taskit/caleb-jones-G3EMue5dLO0-unsplash_gujo4j.jpg',
            'https://res.cloudinary.com/cloudinary-img/image/upload/v1600352680/Taskit/luca-bravo-alS7ewQ41M8-unsplash_h9h4nj.jpg',
            'https://res.cloudinary.com/cloudinary-img/image/upload/v1600352679/Taskit/tony-yeung-Exq6e9gH4Ag-unsplash_e7ltjx.jpg',
            'https://res.cloudinary.com/cloudinary-img/image/upload/v1600352678/Taskit/seth-doyle--AFVBe7VGqQ-unsplash_xjlclq.jpg',
            'https://res.cloudinary.com/cloudinary-img/image/upload/v1600352460/Taskit/daniel-chen-cNaEqXSsZ0k-unsplash_acw6rx.jpg'
        ]
        return (
            <div className="add-img-page">
                 {!this.props.isForBoard&&<div className="empty-modal" onClick={() => this.props.updateState('isAddImgModalShown', false)}></div>}
                <div className= {(this.props.isForBoard)?'':'add-img-modal'}>
                    {imgUrls.map((imgUrl, index) => <img onClick={() => this.onSelectImg(imgUrl)} className="img-preview" key={index} src={imgUrl} alt="Loading" />)}

                    <div className="add-private-img">
                        <label> Add your image </label>
                        <input onChange={this.onAddImg} type="file" />
                    </div>
                </div>
 </div>
        )
    }
}
