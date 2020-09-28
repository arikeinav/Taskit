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
            'https://res.cloudinary.com/dsfnyykw9/image/upload/v1600670107/cristina-gottardi-iInYwn194Tk-unsplash_l5wrah.jpg',
            'https://res.cloudinary.com/dsfnyykw9/image/upload/v1600670064/you-x-ventures-Oalh2MojUuk-unsplash_vl1wmw.jpg',
            'https://res.cloudinary.com/dsfnyykw9/image/upload/v1600670112/scott-graham-5fNmWej4tAA-unsplash_wrvxnx.jpg',
            'https://res.cloudinary.com/dsfnyykw9/image/upload/v1600670086/giusy-iordache-ZtqDLEkJPcc-unsplash_ywibhv.jpg',
            'https://res.cloudinary.com/dsfnyykw9/image/upload/v1600680300/irfan-simsar-wxWulfjN-G0-unsplash_xwffbk.jpg',
            'https://res.cloudinary.com/dsfnyykw9/image/upload/v1601031276/carousel-1684591_s4p4ih.png',
            'https://res.cloudinary.com/dsfnyykw9/image/upload/v1601031276/carousel-1684591_s4p4ih.png',
            'https://res.cloudinary.com/dsfnyykw9/image/upload/v1601031276/carousel-1684591_s4p4ih.png',
           
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
