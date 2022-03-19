function SafeLink({className, disabled, href, text}) {
    console.log(disabled)
    return <a onClick={(e) => disabled ?
        e.preventDefault() : null
    } className={className}  href={!disabled ? href : ""}>{text}</a>

}

export default SafeLink;