import Spinner from "./Spinner"
import RippleButton from "./RippleButton/RippleButton"

export default ({isLoading, children, color = dark}) => (
    <RippleButton className={`d-flex gap-2 btn btn-${color} btn-lg btn-block`} type="submit">
        {isLoading && <Spinner />}
        {children}
    </RippleButton>
)