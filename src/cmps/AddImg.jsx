import React, { Component } from 'react'





import { cloudinaryService } from '../services/cloudinaryService'

export class AddImg extends Component {

    onSelectImg = (imgUrl) => {
        if (this.props.card) {
            this.props.card.imgUrl = imgUrl
            this.props.updateState('isAddImgModalShown', false)
            return this.props.card
        }
        else {
            this.props.onAddimg(imgUrl)

        }

    }
    onAddImg = async (ev) => {
        console.log(ev.target.files[0])
        const imgUrl = await cloudinaryService.uploadImg(ev)
        this.onSelectImg(imgUrl)
    }

    render() {
        const imgUrls = [
            'https://res.cloudinary.com/dsfnyykw9/image/upload/v1600679540/markus-spiske-1LLh8k2_YFk-unsplash_isgzdk.jpg',
            'https://res.cloudinary.com/cloudinary-img/image/upload/v1600352679/Taskit/tony-yeung-Exq6e9gH4Ag-unsplash_e7ltjx.jpg',
            'https://res.cloudinary.com/cloudinary-img/image/upload/v1600352678/Taskit/seth-doyle--AFVBe7VGqQ-unsplash_xjlclq.jpg',
            'https://res.cloudinary.com/dsfnyykw9/image/upload/v1600675580/pawel-czerwinski-3k9PGKWt7ik-unsplash_n9aon0.jpg',
            'https://res.cloudinary.com/dsfnyykw9/image/upload/v1600670064/you-x-ventures-Oalh2MojUuk-unsplash_vl1wmw.jpg',
            'https://res.cloudinary.com/dsfnyykw9/image/upload/v1600670112/scott-graham-5fNmWej4tAA-unsplash_wrvxnx.jpg',
            'https://res.cloudinary.com/dsfnyykw9/image/upload/v1600670086/giusy-iordache-ZtqDLEkJPcc-unsplash_ywibhv.jpg',
            'https://res.cloudinary.com/cloudinary-img/image/upload/v1601453622/Taskit/rowan-heuvel-U6t80TWJ1DM-unsplash_zswnsv.jpg',
            'https://res.cloudinary.com/cloudinary-img/image/upload/v1601453613/Taskit/simon-berger-twukN12EN7c-unsplash_cq4gf9.jpg',
            'https://res.cloudinary.com/cloudinary-img/image/upload/v1601453610/Taskit/paul-gilmore-hKOPVtGQZ4o-unsplash_awqz0q.jpg',
            'https://res.cloudinary.com/cloudinary-img/image/upload/v1601453608/Taskit/frank-mckenna-eXHeq48Z-Q4-unsplash_gqwseh.jpg',
            'https://res.cloudinary.com/cloudinary-img/image/upload/v1601457901/Taskit/sebastien-gabriel-XOrFfUPUfeU-unsplash_i1owuz.jpg'
        ]
        return (
            <div className="add-img-page">
                {!this.props.isForBoard && <div className="empty-modal" onClick={() => this.props.updateState('isAddImgModalShown', false)}></div>}

                <div className={(this.props.isForBoard) ? '' : 'add-img-modal flex column'}>
                <div className='add-private-img'>
                        {imgUrls.map((imgUrl, index) => <img onClick={() => this.onSelectImg(imgUrl)} className={(this.props.isForMenu) ? 'bg-img-preview' :'img-preview' } key={index} src={imgUrl} alt="Loading" />)}

                    </div>
                    <input onChange={this.onAddImg} className="self-center" style={{ width: '180px',marginBottom:'5px' }} type="file" />
                </div>
            </div>
        )
    }
}
