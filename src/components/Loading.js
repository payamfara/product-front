import Spinner from "./Spinner";

export default () => (
    <div className="d-flex gap-3 justify-content-center align-items-center vh-100">
        در حال دریافت اطلاعات ...
        <Spinner />
    </div>
);