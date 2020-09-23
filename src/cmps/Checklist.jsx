import React, { Component } from 'react'
// import { connect } from 'react-redux'
import { ChecklistPreview } from './ChecklistPreview'



export function Checklist({checklist,removeChecklist, saveChecklist }) {
  
     
        return (
            <div>
                { checklist.title && <ChecklistPreview  removeChecklist={removeChecklist} onUpdateChecklists={saveChecklist} checklist={checklist} key={checklist.id} />}
            </div>
        )
    }

