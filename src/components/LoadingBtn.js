import Spinner from "./Spinner"
import RippleButton from "./RippleButton/RippleButton"

export default ({isLoading}) => (
    <RippleButton className="d-flex gap-1 btn btn-dark btn-lg btn-block" type="submit">
        {isLoading && <Spinner />}
        Login
    </RippleButton>
)