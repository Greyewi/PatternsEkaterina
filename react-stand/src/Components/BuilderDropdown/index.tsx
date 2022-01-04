import React, {FC, ReactElement, useState} from 'react'

interface IDText {
    title: string;
    body: string;
}

const DTexts: IDText = {
    title: "Dropdown",
    body: "Something in dropdown area"
}

// class DTexts {
//     private title: string;
//     private body: string;
//     constructor() {
//         this.title = "Dropdown"
//         this.body = "Something in dropdown area"
//     }
// }

interface IDropdownBuilder {
    dContext: IDText,
    addTitle: (text: string) => IDropdownBuilder,
    addBody: (text: string) => IDropdownBuilder,
    build: () => ReactElement
}

function DropdownBuilder(this: IDropdownBuilder, defaultExpanded: boolean): void {
    this.dContext = DTexts
    const [isExpanded, setIsExpanded] = useState<boolean>(defaultExpanded)

    this.addTitle = function(text: string): IDropdownBuilder {
        this.dContext.title = text
        return this
    }

    this.addBody = function(text: string): IDropdownBuilder{
        this.dContext.body = text
        return this
    }

    this.build = function() {
        return <section>
            <div onClick={() => setIsExpanded(!isExpanded)}>{this.dContext.title}</div>
            <div style={{display: isExpanded ? 'block' : 'none'}}>{this.dContext.body}</div>
        </section>
    }
}

interface IProps {
    title: string;
    body: string;
}

const Dropdown: FC<IProps> = ({title = DTexts.title, body= DTexts.body }): ReactElement<IProps> =>
   new (DropdownBuilder as any)(false).addTitle(title).addBody(body).build()

export default Dropdown