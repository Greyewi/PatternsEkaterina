import React, {Dispatch, SetStateAction, ChangeEvent, ReactNode, useState} from 'react'

interface ITInput {
    value: string,
    setValue: Dispatch<SetStateAction<string>>,
    placeholder: string,
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void
    getComponent: (e) => ReactNode
}

function TextInput(this: ITInput, defaultValue: string = '', placeholder: string = 'enter text') {
    [this.value, this.setValue] = useState<string>(defaultValue)
    this.placeholder = placeholder

    this.handleChange = (e) => this.setValue(e?.target?.value)
    this.getComponent = (e) => <input onChange={e} placeholder={this.placeholder} value={this.value}/>
}