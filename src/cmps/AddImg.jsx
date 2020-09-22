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
            'https://res.cloudinary.com/cloudinary-img/image/upload/v1600352680/Taskit/luca-bravo-alS7ewQ41M8-unsplash_h9h4nj.jpg',
            'https://res.cloudinary.com/cloudinary-img/image/upload/v1600352679/Taskit/tony-yeung-Exq6e9gH4Ag-unsplash_e7ltjx.jpg',
            'https://res.cloudinary.com/cloudinary-img/image/upload/v1600352678/Taskit/seth-doyle--AFVBe7VGqQ-unsplash_xjlclq.jpg',
            'https://res.cloudinary.com/cloudinary-img/image/upload/v1600352460/Taskit/daniel-chen-cNaEqXSsZ0k-unsplash_acw6rx.jpg',
            'https://res.cloudinary.com/dsfnyykw9/image/upload/v1600670107/cristina-gottardi-iInYwn194Tk-unsplash_l5wrah.jpg',
            'https://res.cloudinary.com/dsfnyykw9/image/upload/v1600670064/you-x-ventures-Oalh2MojUuk-unsplash_vl1wmw.jpg',
            'https://res.cloudinary.com/dsfnyykw9/image/upload/v1600670112/scott-graham-5fNmWej4tAA-unsplash_wrvxnx.jpg',
            'https://res.cloudinary.com/dsfnyykw9/image/upload/v1600670086/giusy-iordache-ZtqDLEkJPcc-unsplash_ywibhv.jpg',
            // 'https://res.cloudinary.com/dsfnyykw9/image/upload/v1600670073/patrick-perkins-ETRPjvb0KM0-unsplash_cm7bqy.jpg',
            // 'https://res.cloudinary.com/dsfnyykw9/image/upload/v1600675537/yang-shuo-yQr9YTtCGC8-unsplash_vuq9h2.jpg',
            // 'https://res.cloudinary.com/dsfnyykw9/image/upload/v1600675497/daniele-levis-pelusi-UUjxTEET0c0-unsplash_scip3p.jpg',
            // 'https://res.cloudinary.com/dsfnyykw9/image/upload/v1600675580/pawel-czerwinski-3k9PGKWt7ik-unsplash_n9aon0.jpg'
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
