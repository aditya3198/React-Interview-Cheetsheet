function Button({label}: Readonly<{label: string}>) {
    return (
        <button className="customBtn">{label}</button>
    )
}
export default Button;