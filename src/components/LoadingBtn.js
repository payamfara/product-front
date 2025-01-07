import Spinner from "./Spinner"
import RippleButton from "./RippleButton/RippleButton"

export default (props) => {
    const {isLoading, children, color = 'dark', ...rest} = props
    return (
        <RippleButton
            className={`d-flex gap-2 btn btn-${color} btn-lg btn-block`}
            {...rest}
        >
            {isLoading && <Spinner/>}
            {children}
        </RippleButton>)
}